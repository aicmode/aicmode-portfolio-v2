/**
 * Boot-failure safety net.
 *
 * Every section of this site is animated in by framer-motion, which
 * server-renders its `initial` state as an inline `opacity:0`. That means the
 * SSR'd HTML is fully present but completely invisible until the JS bundle
 * runs. If the bundle never runs, the page is a blank #080808 screen with no
 * error and no way out.
 *
 * The realistic way that happens in production: a browser reuses an HTML
 * document from an older deployment, whose hashed `/_next/static` chunks are
 * `immutable` and no longer exist on the current deployment, so every chunk
 * 404s. That state is sticky per browser profile, which is why it shows up in
 * one browser (or one profile) and not in a fresh/private one.
 *
 * Everything here is inlined into the server-rendered document, so it still
 * works when every hashed asset fails.
 *
 * Recovery order:
 *   1. Reload once — normally enough, since the document revalidates and comes
 *      back matching the current deployment's assets.
 *   2. If assets are still unavailable, degrade gracefully rather than showing
 *      a blank screen: reveal the real content when the stylesheet survived,
 *      otherwise show a readable notice with a retry link.
 *
 * The failure notice is BUILT BY THE SCRIPT, not rendered into the document.
 * It used to ship as a `display:none` div, which meant the words
 * "読み込みに失敗しました" were in the served HTML of a perfectly healthy page —
 * visible to crawlers, to text extraction, and to any assistive tech that
 * ignores the CSS. Constructing it at failure time keeps the healthy document
 * free of error copy while losing nothing: the builder is inline, so it is
 * available in exactly the situation it exists for.
 */

const NOTICE_ID = 'aic-boot-notice'

/** Runs before paint, so a failed CSS chunk can't leave a white page. */
const CRITICAL_CSS = `
html{background-color:#080808}
body{margin:0;background-color:#080808;color:#f0f0f0}
/*
 * Stylesheet survived but the bundle did not: reveal the content, which keeps
 * the real design and simply loses the animations. Scoped to true zeros:
 * [style*="opacity:0;"] catches "opacity:0;transform:..." and
 * [style$="opacity:0"] catches a trailing "opacity:0", while decorative values
 * like opacity:0.28 are deliberately left alone.
 */
html.aic-boot-failed [style*="opacity:0;"],
html.aic-boot-failed [style$="opacity:0"]{
opacity:1!important;transform:none!important;filter:none!important
}
/*
 * The stylesheet is gone too, so the design cannot be rendered at all. The
 * notice is injected by the script in that case; hide everything else.
 */
html.aic-boot-degraded body>*:not(#${NOTICE_ID}){display:none}
`.trim()

/** Detects "the bundle never ran" and recovers from it. */
const BOOT_SCRIPT = `
(function(){
  var KEY='aic:boot-recovery',NOTICE=${JSON.stringify(NOTICE_ID)},handled=false;

  function styleSheetLoaded(){
    try{
      return !!getComputedStyle(document.documentElement)
        .getPropertyValue('--aic-css-loaded').trim();
    }catch(e){return false}
  }

  /* Built here rather than server-rendered, so a healthy page never carries
     error copy in its DOM. Styles are inline because this path is reached
     precisely when the stylesheet is missing. */
  function showNotice(){
    if(document.getElementById(NOTICE))return;
    var box=document.createElement('div');
    box.id=NOTICE;
    box.setAttribute('role','alert');
    box.style.cssText='min-height:100vh;display:flex;flex-direction:column;'+
      'align-items:center;justify-content:center;gap:1.5rem;padding:2rem;'+
      'text-align:center;background-color:#080808;color:#f0f0f0;'+
      'font-family:system-ui,-apple-system,sans-serif';
    var brand=document.createElement('p');
    brand.style.cssText='margin:0;font-size:10px;letter-spacing:0.4em;color:rgba(212,175,55,0.75)';
    brand.textContent='AIC';
    var title=document.createElement('h2');
    title.style.cssText='margin:0;font-size:1.125rem;font-weight:700';
    title.textContent='読み込みに失敗しました';
    var body=document.createElement('p');
    body.style.cssText='margin:0;font-size:0.875rem;line-height:1.8;color:rgba(255,255,255,0.55)';
    body.textContent='通信環境をご確認のうえ、再読み込みをお試しください。';
    /* A plain link, not a client-side navigation: this path only runs when the
       JS bundle failed, so a real document request is what is needed. */
    var retry=document.createElement('a');
    retry.href='/';
    retry.style.cssText='padding:0.875rem 2.5rem;font-size:13px;font-weight:600;letter-spacing:0.08em;'+
      'text-decoration:none;color:#080808;border:1px solid rgba(212,175,55,0.48);'+
      'background:linear-gradient(135deg, rgba(255,255,255,0.96), rgba(212,175,55,0.82))';
    retry.textContent='再読み込み';
    box.appendChild(brand);box.appendChild(title);box.appendChild(body);box.appendChild(retry);
    document.body.appendChild(box);
  }

  function degrade(){
    var el=document.documentElement;
    if(!el||!el.classList)return;
    /* Reveal the real design if we still have styles; otherwise inject the
       notice, which carries its own inline styling. */
    if(styleSheetLoaded()){
      el.classList.add('aic-boot-failed');
    }else{
      el.classList.add('aic-boot-degraded');
      showNotice();
    }
  }

  function onBootFailure(){
    if(handled)return;handled=true;
    var tried=null;
    try{tried=sessionStorage.getItem(KEY)}catch(e){}
    if(!tried){
      /* The document is revalidated on reload (max-age=0, must-revalidate),
         so this pulls fresh HTML matching the current deployment's assets.
         The sessionStorage guard makes a reload loop impossible. */
      try{sessionStorage.setItem(KEY,'1')}catch(e){}
      try{location.reload();return}catch(e){}
    }
    degrade();
  }

  /* Fast path: a hashed chunk 404s or fails to load. */
  window.addEventListener('error',function(e){
    var t=e&&e.target;
    if(!t||!t.tagName)return;
    var tag=t.tagName.toLowerCase();
    if(tag!=='script'&&tag!=='link')return;
    if((t.src||t.href||'').indexOf('/_next/static')===-1)return;
    onBootFailure();
  },true);

  /* Race-free backstop: covers every other reason the bundle might not run. */
  setTimeout(function(){if(!window.__aicBooted)onBootFailure()},5000);
})();
`.trim()

export default function BootRecovery() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
    </>
  )
}
