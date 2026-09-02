import { expect, test, type Page } from 'playwright/test'

/** Defaults to the usual dev port; override when a dev server is already on it. */
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

function collectRuntimeErrors(page: Page) {
  const errors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  return errors
}

test.describe('short sales landing page', () => {
  test('shows only the six sales sections and keeps the primary routes clear', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page)

    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })

    await expect(page).toHaveTitle('AIC｜AIを使って、面倒な仕事をラクにします。')
    const sectionIds = await page.locator('main#main > section').evaluateAll((sections) =>
      sections.map((section) => section.id),
    )
    expect(sectionIds).toEqual([
      'top',
      'services',
      'healthcare',
      'works',
      'about',
      'contact',
    ])

    const hero = page.locator('#top')
    await expect(hero).toContainText('医療・介護にも対応できます。')
    await expect(hero).toContainText('AIを使って、')
    await expect(hero).toContainText('作業の自動化')
    await expect(hero).toContainText('AIを使ったツール')
    await expect(hero).toContainText('仕事用のWebアプリ')

    await expect(page.locator('#services article')).toHaveCount(3)
    await expect(page.locator('#services')).toContainText('面倒な仕事を自動化する')
    await expect(page.locator('#services')).toContainText('AIを使った便利なツールを作る')
    await expect(page.locator('#services')).toContainText('仕事に合ったWebアプリを作る')
    await expect(page.getByRole('link', { name: 'できることを詳しく見る' })).toHaveAttribute('href', '/services')

    await expect(page.locator('#healthcare')).toContainText('看護師として約9年間働いた経験')
    await expect(page.getByRole('link', { name: '医療・介護について詳しく見る' })).toHaveAttribute('href', '/healthcare')

    // AI・業務自動化 first and larger, Web制作 second: the order is the claim
    // the page makes about what this portfolio is, so it is asserted here.
    const works = page.locator('#works')
    const groupHeadings = await works.locator('h3').allTextContents()
    expect(groupHeadings).toEqual(['AI・業務自動化', 'Web制作'])

    const featured = works.locator('article')
    await expect(featured).toHaveCount(8)
    for (const title of [
      'MediBrief',
      'MediChart Lite',
      'Handover Maker',
      'Dify AI Chat',
      'Smart Expense Tracker',
      'MedDose',
      'Nurse FUKUGYO Lab',
    ]) {
      await expect(featured.getByRole('heading', { name: title, exact: true })).toBeVisible()
    }

    const nurseCard = featured.filter({
      has: page.getByRole('heading', { name: 'Nurse FUKUGYO Lab', exact: true }),
    })
    await expect(nurseCard.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
      'href',
      'https://aicmode.github.io/NURSE-FUKUGYO-LAB/',
    )
    await expect(page.locator('#works').getByText(/自主制作/).first()).toBeVisible()
    await expect(page.locator('#works').getByText(/学習のための制作/).first()).toBeVisible()
    await expect(page.locator('#works').getByText(/試作品（実機で動作確認済み）/)).toBeVisible()
    await expect(page.getByRole('link', { name: 'すべての制作実績を見る（32件）' })).toHaveAttribute('href', '/works')

    const profile = page.locator('#about')
    await expect(profile).toContainText('看護師として約9年')
    await expect(profile).toContainText('ご相談から制作、公開まで一人で担当します。')
    const profileImage = profile.getByAltText('AICのプロフィール写真')
    await expect(profileImage).toBeVisible()
    await profileImage.scrollIntoViewIfNeeded()
    await expect.poll(() => profileImage.evaluate((image: HTMLImageElement) => image.complete)).toBe(true)
    const profileImageState = await profileImage.evaluate((image: HTMLImageElement) => ({
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      objectFit: getComputedStyle(image).objectFit,
    }))
    expect(profileImageState.naturalWidth).toBeGreaterThan(0)
    expect(profileImageState.naturalHeight).toBeGreaterThan(0)
    expect(profileImageState.objectFit).toBe('cover')
    await expect(profile.getByRole('link', { name: '自己紹介を詳しく見る' })).toHaveAttribute('href', '/about')

    await expect(page.locator('#contact')).toContainText('まずは困っていることを教えてください。')
    const line = page.getByRole('link', { name: /LINEで相談する/ })
    await expect(line).toHaveAttribute('href', 'https://line.me/R/ti/p/@862povmk')
    await expect(line).toHaveAttribute('target', '_blank')
    await expect(line).toHaveAttribute('rel', /noopener/)
    const github = page.getByRole('link', { name: /GitHubで制作内容を見る/ })
    await expect(github).toHaveAttribute('href', 'https://github.com/aicmode')

    await expect(page.getByText('お困りごとから探す')).toHaveCount(0)
    await expect(page.getByText('お渡しできるもの')).toHaveCount(0)
    await expect(page.getByText('得意なこと')).toHaveCount(0)
    await expect(page.getByText('使える技術の一覧')).toHaveCount(0)
    await expect(page.getByText('ご相談前によくいただく質問')).toHaveCount(0)

    const navLabels = await page.locator('nav > div').first().getByRole('link').allTextContents()
    expect(navLabels.map((label) => label.trim())).toEqual([
      'AIC',
      'できること',
      '制作実績',
      '医療・介護',
      '自己紹介',
      'よくある質問',
      'お問い合わせ',
    ])

    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    expect(pageHeight).toBeLessThan(9000)
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(1200)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(300)
    await page.screenshot({ path: '/tmp/aicmode-home-pc.png', fullPage: true })
    expect(runtimeErrors).toEqual([])
  })

  test('fits a phone viewport without horizontal overflow', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page)

    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight,
    }))
    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)
    expect(dimensions.height).toBeLessThan(12000)
    await expect(page.locator('#works article')).toHaveCount(8)

    await page.getByRole('button', { name: 'メニューを開く' }).click()
    await expect(page.getByRole('link', { name: 'お問い合わせ', exact: true })).toBeVisible()
    await page.getByRole('link', { name: 'お問い合わせ', exact: true }).click()
    await expect(page.locator('#contact')).toBeInViewport()
    await page.waitForTimeout(1200)
    await page.screenshot({ path: '/tmp/aicmode-home-mobile.png', fullPage: true })
    expect(runtimeErrors).toEqual([])
  })
})

test.describe('detail pages retain the removed information', () => {
  test('services retains problem and deliverable details', async ({ page }) => {
    await page.goto(`${BASE_URL}/services`)
    await expect(page.getByText('お困りごとから探す', { exact: true })).toBeVisible()
    await expect(page.getByText('お渡しできるもの', { exact: true })).toBeVisible()
    await expect(page.locator('#services article')).toHaveCount(3)
  })

  test('healthcare retains all four safety and workflow points', async ({ page }) => {
    await page.goto(`${BASE_URL}/healthcare`)
    for (const text of ['現場の流れが分かります', '医療の言葉が分かります', '安全を最優先にします', '先に確認してから作ります']) {
      await expect(page.getByText(text)).toBeVisible()
    }
  })

  test('works retains the AI cases and all 32 site/app records', async ({ page }) => {
    await page.goto(`${BASE_URL}/works`, { waitUntil: 'networkidle' })
    await expect(page.locator('#case-studies article')).toHaveCount(5)
    await expect(page.locator('#archive article')).toHaveCount(32)
    await expect(page.locator('#archive')).toContainText('全32件')
    await expect(page.getByRole('heading', { name: 'MediChart Lite', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Handover Maker', exact: true })).toBeVisible()
  })

  test('the archive filters by 大分類 first, then by the existing categories', async ({ page }) => {
    await page.goto(`${BASE_URL}/works`, { waitUntil: 'networkidle' })

    const domainTabs = page.getByRole('group', { name: '大きな分類で絞り込み' })
    for (const label of ['すべて', 'AI・業務自動化', 'Web制作']) {
      await expect(domainTabs.getByRole('button', { name: new RegExp(`^${label}`) })).toBeVisible()
    }

    // Only the top level is offered until a domain is picked.
    await expect(page.getByRole('group', { name: /の中で絞り込み/ })).toHaveCount(0)

    await domainTabs.getByRole('button', { name: /^AI・業務自動化/ }).click()
    await expect(page.locator('#archive article')).toHaveCount(11)
    await expect(page.getByRole('heading', { name: 'Handover Maker', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Nurse FUKUGYO Lab', exact: true })).toHaveCount(0)

    const subTabs = page.getByRole('group', { name: 'AI・業務自動化の中で絞り込み' })
    for (const label of ['すべて', 'AIのしくみ', '作業の自動化', '仕事用アプリ']) {
      await expect(subTabs.getByRole('button', { name: new RegExp(`^${label}`) })).toBeVisible()
    }
    await subTabs.getByRole('button', { name: /^作業の自動化/ }).click()
    await expect(page.locator('#archive article')).toHaveCount(2)

    await domainTabs.getByRole('button', { name: /^Web制作/ }).click()
    await expect(page.locator('#archive article')).toHaveCount(21)
    const nurse = page.locator('#archive article').filter({
      has: page.getByRole('heading', { name: 'Nurse FUKUGYO Lab', exact: true }),
    })
    await expect(nurse).toHaveCount(1)
    await expect(nurse.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
      'href',
      'https://aicmode.github.io/NURSE-FUKUGYO-LAB/',
    )

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)
  })

  test('Handover Maker keeps the shared card, detail, links, and responsive layout', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page)

    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 })
      await page.goto(`${BASE_URL}/works`, { waitUntil: 'networkidle' })

      const handoverCard = page.locator('#archive article').filter({
        has: page.getByRole('heading', { name: 'Handover Maker', exact: true }),
      })
      await expect(handoverCard).toHaveCount(1)
      await expect(handoverCard).toContainText('完全オフライン対応ツール')
      await expect(handoverCard.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
        'href',
        'https://aicmode.github.io/offline-handover/',
      )
      await expect(handoverCard.getByRole('link', { name: /GitHubで見る/ })).toHaveAttribute(
        'href',
        'https://github.com/aicmode/offline-handover',
      )

      const cardImage = handoverCard.getByAltText(/申し送りメーカーVer2\.0/)
      await expect(cardImage).toBeVisible()
      await expect.poll(() => cardImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)

      await handoverCard.scrollIntoViewIfNeeded()
      await page.screenshot({ path: `/tmp/aicmode-handover-card-${width}.png` })

      await handoverCard.getByRole('button', { name: /詳しく見る/ }).click()
      const dialog = page.getByRole('dialog', { name: 'Handover Maker' })
      await expect(dialog).toBeVisible()
      await expect(dialog).toContainText('Nodeテスト125件成功')
      await expect(dialog).toContainText('公開デモには実在する個人情報を入力しないでください')

      await page.waitForTimeout(500)
      await page.screenshot({ path: `/tmp/aicmode-handover-detail-${width}.png` })

      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))
      expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)

    }

    expect(runtimeErrors).toEqual([])
  })

  test('about retains profile, strengths, values, and skills', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`)
    await expect(page.getByText('とくに得意な6つのこと')).toBeVisible()
    await expect(page.getByText('大切にしていること', { exact: true })).toBeVisible()
    await expect(page.getByText('使える技術の一覧')).toBeVisible()
    await expect(page.getByText('考え方・進め方')).toBeVisible()
  })

  test('FAQ retains all ten answers', async ({ page }) => {
    await page.goto(`${BASE_URL}/faq`)
    await expect(page.locator('#faq h3')).toHaveCount(10)
    await expect(page.getByText('何を作るか決まっていなくても相談できますか？')).toBeVisible()
  })

  test('contact retains inquiry examples and checklist', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`)
    await expect(page.locator('#process')).toContainText('ご相談から公開まで')
    await expect(page.locator('#process h3')).toHaveCount(5)
    await expect(page.getByText('こんなご相談が多いです')).toBeVisible()
    await expect(page.getByText('お伝えいただきたいこと')).toBeVisible()
    await expect(page.getByRole('link', { name: /LINE公式アカウント/ })).toHaveAttribute(
      'href',
      'https://line.me/R/ti/p/@862povmk',
    )
  })
})
