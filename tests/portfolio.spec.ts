import { expect, test } from 'playwright/test'

const viewports = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
] as const

test('sales content, navigation, dialogs, FAQ, and external-link safety', async ({ page }) => {
  test.setTimeout(120_000)

  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })

  await expect(page).toHaveTitle('AICMODE｜AIを使って、面倒な仕事をラクにします。')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /時間のかかる仕事をAIやシステムを使って効率化します/,
  )
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('#top')).toContainText('AIを使って、')
  await expect(page.locator('#top')).toContainText('看護師として約9年間働いた経験')
  await expect(page.locator('#top dl dd')).toHaveText(['06', '29'])
  await expect(page.locator('#case-studies article')).toHaveCount(6)
  await expect(page.locator('#case-studies')).not.toContainText('MediChart Lite')
  await expect(page.locator('#healthcare')).toContainText('看護師として約9年間')
  await expect(page.locator('#works')).toContainText('サイト・アプリ 29件 ／ AI・自動化 6件')
  await expect(page.locator('#works article')).toHaveCount(9)

  const servicesCta = page.getByRole('link', { name: 'できることを見る' })
  const worksCta = page.getByRole('link', { name: '制作実績を見る' })
  await expect(servicesCta).toHaveAttribute('href', '#services')
  await expect(worksCta).toHaveAttribute('href', '#works')

  const firstCase = page.locator('#case-studies article').first()
  await expect(firstCase).toContainText('担当')
  await expect(firstCase).toContainText('種類')
  await expect(firstCase).toContainText('公開中')
  const caseTrigger = firstCase.getByRole('button', { name: '詳しく見る' })
  await caseTrigger.click()
  const caseDialog = page.getByRole('dialog', { name: '受診メモ作成ツール' })
  await expect(caseDialog).toBeVisible()
  await expect(caseDialog).toContainText('自主制作')
  await page.keyboard.press('Escape')
  await expect(caseDialog).toBeHidden()
  await expect(caseTrigger).toBeFocused()

  const firstWork = page.locator('#works article').first()
  const workName = await firstWork.getByRole('heading').textContent()
  await firstWork.getByRole('button', { name: /詳しく見る/ }).click()
  const workDialog = page.getByRole('dialog', { name: workName ?? '' })
  await expect(workDialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(workDialog).toBeHidden()

  const medichartCard = page.locator('#works article', {
    has: page.getByRole('heading', { name: 'MediChart Lite', exact: true }),
  })
  await expect(medichartCard).toHaveCount(1)
  await expect(medichartCard).toContainText('医療記録の管理アプリ')
  await expect(medichartCard).toContainText('患者さんの情報や記録を、ひとつの画面で管理できるアプリ。')
  await expect(medichartCard).toContainText('仕事用アプリ')
  await expect(medichartCard).toContainText('公開中')
  await expect(medichartCard).toContainText('更新')
  // The card leads with plain language: nothing technical belongs on it.
  await expect(medichartCard).not.toContainText(/Recharts/i)
  const medichartImage = medichartCard.locator('img')
  await expect(medichartImage).toHaveAttribute('src', /medichart-lite-clinical-dashboard\.jpg/)
  await expect(medichartImage).not.toHaveAttribute('src', /medichart-lite\.webp/)
  await expect.poll(() => medichartImage.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  const medichartLiveLink = medichartCard.getByRole('link', { name: /実際に見る/ })
  await expect(medichartLiveLink).toHaveAttribute(
    'href',
    'https://medichart-lite.vercel.app',
  )
  await expect(medichartLiveLink).toHaveAttribute('target', '_blank')
  await expect(medichartLiveLink).toHaveAttribute('rel', /noopener/)
  await expect(medichartLiveLink).toHaveAttribute('rel', /noreferrer/)
  await expect(medichartCard.getByRole('link', { name: /GitHubで見る/ })).toHaveAttribute(
    'href',
    'https://github.com/aicmode/medichart-lite',
  )
  await medichartCard.getByRole('button', { name: /詳しく見る/ }).click()
  const medichartDialog = page.getByRole('dialog', { name: 'MediChart Lite' })
  await expect(medichartDialog).toContainText('安全のための決めごと')
  await expect(medichartDialog).toContainText('実在患者情報は扱わず')
  await expect(medichartDialog).toContainText('画面の開発')
  await expect(medichartDialog).toContainText('Recharts')
  await expect(medichartDialog.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
    'href',
    'https://medichart-lite.vercel.app',
  )
  await expect(medichartDialog.getByRole('link', { name: /GitHubで中身を見る/ })).toHaveAttribute(
    'href',
    'https://github.com/aicmode/medichart-lite',
  )
  await page.keyboard.press('Escape')
  await expect(medichartDialog).toBeHidden()

  /*
   * MedDose is the one piece with no deployment of any kind. The assertions
   * below are as much about what must NOT be on the card as what must: a store
   * listing and a hosted demo do not exist, so no control may offer either.
   */
  const meddoseCard = page.locator('#works article', {
    has: page.getByRole('heading', { name: 'MedDose', exact: true }),
  })
  await expect(meddoseCard).toHaveCount(1)
  await expect(meddoseCard).toContainText('Apple Watchのアプリ')
  await expect(meddoseCard).toContainText('試作品')
  await expect(meddoseCard).toContainText('薬をいつまで飲むのかを、腕時計の上で自動計算してくれるアプリ。')
  await expect(meddoseCard).not.toContainText('App Store公開済み')
  await expect(
    meddoseCard.getByRole('link', { name: /App Store|実際に見る/ }),
  ).toHaveCount(0)
  const meddosePoster = meddoseCard.locator('img')
  // The card now uses the dedicated landscape product visual, not a gallery capture.
  await expect(meddosePoster).toHaveAttribute('src', /meddose-card\.png/)
  await expect(meddosePoster).toHaveCSS('object-fit', 'cover')
  await expect
    .poll(() => meddosePoster.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0)
  /*
   * `View Project` and the poster both hand off to the repository in a new tab,
   * which is the rule every other card follows.
   */
  const meddoseProject = meddoseCard.getByRole('link', { name: /中身を見る/ })
  await expect(meddoseProject).toHaveCount(1)
  await expect(meddoseProject).toHaveAttribute('href', 'https://github.com/aicmode/MedDose')
  await expect(meddoseProject).toHaveAttribute('target', '_blank')
  await expect(meddoseProject).toHaveAttribute('rel', /noopener/)
  await expect(meddoseCard.locator('a.editorial-poster-link')).toHaveAttribute(
    'href',
    'https://github.com/aicmode/MedDose',
  )

  /*
   * 「詳しく見る」 is a button, never a link: it opens the shared dialog in place.
   * The URL, the tab count and the scroll position all have to survive it — the
   * visitor must come back to exactly the card they left.
   */
  await expect(meddoseCard.getByRole('link', { name: /詳しく見る/ })).toHaveCount(0)
  const urlBeforeDialog = page.url()
  const tabsBeforeDialog = page.context().pages().length
  await meddoseCard.scrollIntoViewIfNeeded()
  const scrollBeforeDialog = await page.evaluate(() => window.scrollY)
  await meddoseCard.getByRole('button', { name: /詳しく見る/ }).click()
  const meddoseDialog = page.getByRole('dialog', { name: 'MedDose' })
  await expect(meddoseDialog).toBeVisible()
  expect(page.url()).toBe(urlBeforeDialog)
  expect(page.context().pages().length).toBe(tabsBeforeDialog)

  /*
   * The overlay has to cover the viewport and nothing else. It is `position:
   * fixed`, but a transform anywhere up the ancestor chain (an animation on
   * <body> retaining one, say) silently re-anchors it to the whole document and
   * parks the panel far above the reader — which the page then papers over by
   * scrolling. Measuring the overlay catches that at the cause.
   */
  const overlayBox = await page.locator('.detail-modal-overlay').evaluate((overlay) => {
    const box = overlay.getBoundingClientRect()
    return { top: Math.round(box.top), left: Math.round(box.left), height: Math.round(box.height) }
  })
  expect(overlayBox).toEqual({ top: 0, left: 0, height: page.viewportSize()!.height })
  await expect(meddoseDialog).toBeInViewport({ ratio: 0.9 })
  const scrollWithDialogOpen = await page.evaluate(() => window.scrollY)
  // Opening must not move the page behind the dialog either.
  expect(scrollWithDialogOpen).toBe(scrollBeforeDialog)

  // Header, exactly the fields every other work dialog prints.
  await expect(meddoseDialog.getByRole('heading', { name: 'MedDose', exact: true })).toBeVisible()
  await expect(meddoseDialog).toContainText('作業の自動化')
  await expect(meddoseDialog).toContainText('自主制作')
  await expect(meddoseDialog).toContainText('試作品')
  await expect(meddoseDialog).toContainText('腕時計で使う服薬スケジュール計算アプリ（2026年）')
  await expect(meddoseDialog).toContainText('臨時薬は開始日と朝・昼・夕・就')
  await expect(meddoseDialog).toContainText('Apple Watch上で処方内容と開始条件を選ぶだけで')
  await expect(meddoseDialog).toContainText('Apple Watch Series 11 の実機へXcodeからインストール')
  await expect(meddoseDialog).toContainText('医療判断・処方決定・投薬指示を行うアプリではありません')
  await expect(meddoseDialog).toContainText('Swift · SwiftUI · watchOS · Xcode · Git · GitHub')
  await expect(meddoseDialog.getByRole('link', { name: /GitHubで中身を見る/ })).toHaveAttribute(
    'href',
    'https://github.com/aicmode/MedDose',
  )
  await expect(meddoseDialog.getByRole('link', { name: /実際に見る|App Store/ })).toHaveCount(0)

  /*
   * Hero first, then the five captures in operation order — the hero is the
   * frame every dialog opens with, so the gallery adds to the shared layout
   * rather than standing in for part of it.
   */
  const dialogImages = meddoseDialog.locator('img')
  await expect(dialogImages).toHaveCount(6)
  await expect(dialogImages.first()).toHaveAttribute('src', /meddose-card\.png/)
  const dialogFlow = await meddoseDialog.locator('ol li').evaluateAll((items) =>
    items.map((item) => {
      const frame = item.querySelector<HTMLElement>('div')!
      const image = item.querySelector<HTMLImageElement>('img')!
      const box = frame.getBoundingClientRect()
      return {
        src: image.getAttribute('src') ?? '',
        objectFit: getComputedStyle(image).objectFit,
        ratio: box.width / box.height,
      }
    }),
  )
  expect(dialogFlow).toHaveLength(5)
  dialogFlow.forEach((frame, index) => {
    expect(frame.src).toContain(
      ['01-home', '02-select-time', '03-start-date', '04-result-top', '05-result-bottom'][index],
    )
    // The watch is portrait: its real 374 × 446 ratio, never stretched.
    expect(frame.objectFit).toBe('contain')
    expect(frame.ratio).toBeCloseTo(374 / 446, 2)
  })
  await expect
    .poll(() => dialogImages.last().evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0)

  /*
   * Same dialog component as every other card, so the panel it renders is the
   * same panel — measured against AI Prompt Manager's rather than described.
   */
  const panelOf = (dialog: typeof meddoseDialog) =>
    dialog.evaluate((panel) => ({
      className: panel.className,
      width: Math.round(panel.getBoundingClientRect().width),
      background: getComputedStyle(panel).backgroundColor,
      border: `${getComputedStyle(panel).borderWidth} ${getComputedStyle(panel).borderColor}`,
    }))
  const meddosePanel = await panelOf(meddoseDialog)
  await meddoseDialog.getByRole('button', { name: '閉じる' }).click()
  await expect(meddoseDialog).toBeHidden()
  // Closing leaves the grid exactly where it was.
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollWithDialogOpen)

  const apmCard = page.locator('#works article', {
    has: page.getByRole('heading', { name: 'AI Prompt Manager', exact: true }),
  })
  await apmCard.getByRole('button', { name: /詳しく見る/ }).click()
  const apmDialog = page.getByRole('dialog', { name: 'AI Prompt Manager' })
  await expect(apmDialog).toBeVisible()
  expect(meddosePanel).toEqual(await panelOf(apmDialog))
  await page.keyboard.press('Escape')
  await expect(apmDialog).toBeHidden()

  const archive = page.locator('#archive')
  await archive.locator('.works-tabs button', { hasText: /^仕事用アプリ/ }).click()
  await expect(archive.locator('article')).toHaveCount(6)
  await expect(
    archive.locator('article', { has: page.getByRole('heading', { name: 'MediChart Lite', exact: true }) }),
  ).toHaveCount(1)

  const faqTrigger = page.locator('#faq h3 button').nth(1)
  await expect(faqTrigger).toHaveAttribute('aria-expanded', 'false')
  await faqTrigger.click()
  await expect(faqTrigger).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator(`#${await faqTrigger.getAttribute('aria-controls')}`)).toBeVisible()

  const externalLinks = page.locator('a[target="_blank"]')
  expect(await externalLinks.count()).toBeGreaterThan(0)
  for (let index = 0; index < (await externalLinks.count()); index += 1) {
    const link = externalLinks.nth(index)
    await expect(link).toHaveAttribute('href', /^https:\/\//)
    await expect(link).toHaveAttribute('rel', /noopener/)
    await expect(link).toHaveAttribute('rel', /noreferrer/)
  }

  expect(consoleErrors).toEqual([])
  expect(pageErrors).toEqual([])
})

/**
 * The MedDose detail page.
 *
 * Two things are being protected here. One is completeness: the seven sections
 * a visitor was promised, the five captures in operation order, and the GitHub
 * link. The other is restraint — nothing on this page may claim a store
 * listing, a workplace rollout, or any other thing that has not happened.
 */
test('MedDose detail page across desktop, tablet, and mobile', async ({ page, request }) => {
  test.setTimeout(120_000)

  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  const errorResponses: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) errorResponses.push(`${response.status()} ${response.url()}`)
  })

  const expectedOrder = ['01-home', '02-select-time', '03-start-date', '04-result-top', '05-result-bottom']

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('http://localhost:3000/works/meddose', { waitUntil: 'networkidle' })

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('MedDose')
    await expect(page.locator('h1')).toHaveCount(1)

    // Every required section, by its Japanese label.
    for (const section of [
      '操作の流れ',
      'こまっていたこと',
      'つくったもの',
      '主な機能',
      '担当した範囲',
      '使った技術',
      '確認できたこと',
      'ご注意ください',
    ]) {
      await expect(page.locator('main')).toContainText(section)
    }

    await expect(page.locator('main')).toContainText('試作品')
    await expect(page.locator('main')).toContainText('Apple Watch 実機動作確認済み')
    await expect(page.locator('main')).toContainText('Apple Watch Series 11 の実機')
    await expect(page.locator('main')).toContainText('医療判断・処方決定・投薬指示を行うアプリではありません')
    await expect(page.locator('main')).toContainText('処方箋、電子カルテ、医師の指示を必ず確認')

    // Claims that would be false.
    for (const forbidden of ['App Store公開済み', '職場導入済み', '導入実績', 'ダウンロード数']) {
      await expect(page.locator('main')).not.toContainText(forbidden)
    }
    await expect(page.getByRole('link', { name: /App Store|実際に見る/ })).toHaveCount(0)

    // GitHub, reachable from the page, opening the right repository safely.
    const githubLinks = page.getByRole('link', { name: /GitHub/ })
    expect(await githubLinks.count()).toBeGreaterThan(0)
    for (let index = 0; index < (await githubLinks.count()); index += 1) {
      const link = githubLinks.nth(index)
      await expect(link).toHaveAttribute('href', 'https://github.com/aicmode/MedDose')
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noopener/)
      await expect(link).toHaveAttribute('rel', /noreferrer/)
    }

    // Five captures, in operation order, at the watch's real 374 × 446 ratio.
    const frames = page.locator('main ol li')
    await expect(frames).toHaveCount(5)
    await frames.first().scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        frames.last().locator('img').evaluate((image) => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0)

    const flow = await frames.evaluateAll((items) =>
      items.map((item) => {
        const frame = item.querySelector<HTMLElement>('div')!
        const image = item.querySelector<HTMLImageElement>('img')!
        const box = frame.getBoundingClientRect()
        return {
          src: image.getAttribute('src') ?? '',
          alt: image.alt,
          caption: item.querySelector('p')?.textContent ?? '',
          ratio: box.width / box.height,
          objectFit: getComputedStyle(image).objectFit,
          loaded: image.complete && image.naturalWidth > 0,
          right: box.right,
        }
      }),
    )
    flow.forEach((frame, index) => {
      expect(frame.src).toContain(expectedOrder[index])
      expect(frame.alt.length).toBeGreaterThan(0)
      expect(frame.caption.length).toBeGreaterThan(0)
      expect(frame.objectFit).toBe('contain')
      expect(frame.ratio).toBeCloseTo(374 / 446, 2)
      expect(frame.loaded).toBe(true)
      expect(frame.right).toBeLessThanOrEqual(viewport.width + 1)
    })

    const doc = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(doc.scrollWidth).toBeLessThanOrEqual(doc.clientWidth)

    // Back to the works grid, in-site.
    const back = page.getByRole('link', { name: /制作実績にもどる/ }).first()
    await expect(back).toHaveAttribute('href', '/#works')
  }

  // The page is a real, crawlable route rather than a client-side redirect.
  const response = await request.get('http://localhost:3000/works/meddose')
  expect(response.status()).toBe(200)

  expect(consoleErrors).toEqual([])
  expect(pageErrors).toEqual([])
  expect(errorResponses).toEqual([])
})

test('MedDose card keeps its product visual contained across desktop, tablet, and mobile', async ({ page }) => {
  test.setTimeout(120_000)

  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })

    const card = page.locator('#works article', {
      has: page.getByRole('heading', { name: 'MedDose', exact: true }),
    })
    await card.scrollIntoViewIfNeeded()
    await expect
      .poll(() => card.locator('img').evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0)

    const layout = await card.evaluate((element) => {
      const cardBox = element.getBoundingClientRect()
      const shell = element.querySelector<HTMLElement>('.editorial-poster-shell')!
      const image = element.querySelector<HTMLImageElement>('img')!
      return {
        cardLeft: cardBox.left,
        cardRight: cardBox.right,
        cardHeight: Math.round(cardBox.height),
        imageLoaded: image.complete && image.naturalWidth > 0 && image.naturalHeight > 0,
        imageSource: image.currentSrc,
        imageObjectFit: getComputedStyle(image).objectFit,
        imageObjectPosition: getComputedStyle(image).objectPosition,
        shellRatio: shell.clientWidth / shell.clientHeight,
      }
    })

    expect(layout.cardLeft).toBeGreaterThanOrEqual(0)
    expect(layout.cardRight).toBeLessThanOrEqual(viewport.width)
    expect(layout.imageLoaded).toBe(true)
    expect(layout.imageSource).toContain('meddose-card.png')
    expect(layout.imageObjectFit).toBe('cover')
    expect(layout.imageObjectPosition).toBe('50% 50%')
    expect(Math.abs(layout.shellRatio - (viewport.width < 768 ? 16 / 10.5 : 16 / 10))).toBeLessThan(0.02)

    const rowHeights = await page.locator('#works article').evaluateAll((cards, medDoseTop) => {
      const sameRow = cards.filter(
        (card) => Math.round(card.getBoundingClientRect().top) === Math.round(Number(medDoseTop)),
      )
      return sameRow.map((card) => Math.round(card.getBoundingClientRect().height))
    }, await card.evaluate((element) => element.getBoundingClientRect().top))
    expect(rowHeights.length).toBeGreaterThan(0)
    expect(rowHeights.every((height) => height === layout.cardHeight)).toBe(true)
  }

  expect(consoleErrors).toEqual([])
  expect(pageErrors).toEqual([])
})

test('MediChart Lite card stays contained across desktop, tablet, and mobile', async ({ page }) => {
  test.setTimeout(120_000)

  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })

    const card = page.locator('#works article', {
      has: page.getByRole('heading', { name: 'MediChart Lite', exact: true }),
    })
    await card.scrollIntoViewIfNeeded()

    const layout = await card.evaluate((element) => {
      const cardBox = element.getBoundingClientRect()
      const shell = element.querySelector<HTMLElement>('.editorial-poster-shell')
      const image = element.querySelector<HTMLImageElement>('img')
      const badges = [...element.querySelectorAll<HTMLElement>('.editorial-poster-shell > div')]
      return {
        cardLeft: cardBox.left,
        cardRight: cardBox.right,
        cardContained: element.scrollWidth <= element.clientWidth,
        imageLoaded: Boolean(image?.complete && image.naturalWidth > 0 && image.naturalHeight > 0),
        imageSource: image?.currentSrc ?? '',
        imageObjectFit: image ? getComputedStyle(image).objectFit : '',
        shellRatio: shell ? shell.clientWidth / shell.clientHeight : 0,
        badgesContained: badges.every((badge) => {
          const badgeBox = badge.getBoundingClientRect()
          const shellBox = shell?.getBoundingClientRect()
          return Boolean(shellBox && badgeBox.left >= shellBox.left && badgeBox.right <= shellBox.right)
        }),
      }
    })

    expect(layout.cardLeft).toBeGreaterThanOrEqual(0)
    expect(layout.cardRight).toBeLessThanOrEqual(viewport.width)
    expect(layout.cardContained).toBe(true)
    expect(layout.imageLoaded).toBe(true)
    expect(layout.imageSource).toContain('medichart-lite-clinical-dashboard.jpg')
    expect(layout.imageObjectFit).toBe('cover')
    expect(layout.shellRatio).toBeGreaterThan(1.45)
    expect(layout.badgesContained).toBe(true)

    const pageWidth = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(pageWidth.scrollWidth).toBeLessThanOrEqual(pageWidth.clientWidth)

    /*
     * The card carries the densest meta in the grid, so it is the one that can
     * pull every other card taller (`auto-rows-fr` hands the tallest card's
     * height to the whole section). Assert the finished geometry — same height
     * and bottom edge as its row neighbours, action row on the bottom, nothing
     * clipped — rather than any single CSS value.
     */
    const grid = await page.evaluate(() => {
      const cards = [...document.querySelectorAll<HTMLElement>('#works article')]
      const read = (card: HTMLElement) => {
        const box = card.getBoundingClientRect()
        const meta = card.querySelector<HTMLElement>('.editorial-work-meta > div')!
        const actions = card.querySelector<HTMLElement>('.work-card-actions')!
        return {
          title: card.querySelector('h3')?.textContent ?? '',
          top: Math.round(box.top),
          bottom: Math.round(box.bottom),
          height: Math.round(box.height),
          gapBelowActions: Math.round(box.bottom - actions.getBoundingClientRect().bottom),
          clipped: meta.scrollHeight - meta.clientHeight,
        }
      }
      const all = cards.map(read)
      const medichart = all.find((entry) => entry.title === 'MediChart Lite')!
      const row = all.filter((entry) => entry.top === medichart.top && entry.title !== medichart.title)
      return { medichart, row }
    })

    expect(grid.medichart.clipped).toBe(0)
    for (const neighbour of grid.row) {
      expect(neighbour.height).toBe(grid.medichart.height)
      expect(neighbour.bottom).toBe(grid.medichart.bottom)
      expect(neighbour.gapBelowActions).toBe(grid.medichart.gapBelowActions)
    }
  }

  expect(consoleErrors).toEqual([])
  expect(pageErrors).toEqual([])
})

test('Handover AI card, AI Systems filter, details, and image across responsive viewports', async ({ page }) => {
  test.setTimeout(120_000)

  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })

    const archive = page.locator('#archive')
    const aiSystemsTab = archive.locator('.works-tabs button', { hasText: /^AIのしくみ/ })
    await expect(aiSystemsTab.locator('span')).toHaveText('2')
    await aiSystemsTab.click()
    await expect(archive.locator('article')).toHaveCount(2)

    const card = archive.locator('article', {
      has: page.getByRole('heading', { name: 'Handover AI', exact: true }),
    })
    await expect(card).toHaveCount(1)
    await expect(card).toContainText('看護の申し送り支援アプリ')
    await expect(card).toContainText('AIのしくみ')
    await expect(card).toContainText('公開中')
    await expect(card).toContainText('申し送り内容を整理して、伝えやすくするツール。')
    await expect(card.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
      'href',
      'https://handover-ai-chi.vercel.app',
    )

    const image = card.locator('img')
    await expect(image).toHaveAttribute('src', /handover-ai\.webp/)
    await expect
      .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0)

    const layout = await card.evaluate((element) => {
      const cardBox = element.getBoundingClientRect()
      const shell = element.querySelector<HTMLElement>('.editorial-poster-shell')!
      const poster = element.querySelector<HTMLImageElement>('img')!
      return {
        left: cardBox.left,
        right: cardBox.right,
        contained: element.scrollWidth <= element.clientWidth,
        shellRatio: shell.clientWidth / shell.clientHeight,
        objectFit: getComputedStyle(poster).objectFit,
      }
    })
    expect(layout.left).toBeGreaterThanOrEqual(0)
    expect(layout.right).toBeLessThanOrEqual(viewport.width)
    expect(layout.contained).toBe(true)
    expect(layout.objectFit).toBe('cover')
    expect(Math.abs(layout.shellRatio - (viewport.width < 768 ? 16 / 10.5 : 16 / 10))).toBeLessThan(0.02)

    const imageTransformBeforeHover = await image.evaluate((element) => getComputedStyle(element).transform)
    await card.hover()
    await expect
      .poll(() => image.evaluate((element) => getComputedStyle(element).transform))
      .not.toBe(imageTransformBeforeHover)

    await card.getByRole('button', { name: /詳しく見る/ }).click()
    const dialog = page.getByRole('dialog', { name: 'Handover AI' })
    await expect(dialog).toBeVisible()
    for (const heading of [
      '概要',
      'このプロジェクトについて',
      'こまっていたこと',
      'つくったもの',
      'できること',
      'AIが行う流れ',
      '音声入力と読み上げ',
      '申し送りの型（SBAR）',
      '確認の優先度',
      '人が確認してから完了する流れ',
      '安全のための設計',
      '使っている技術',
      'ご注意（試作品です）',
    ]) {
      await expect(dialog.getByRole('heading', { name: heading, exact: true })).toBeVisible()
    }
    await expect(dialog).toContainText('実患者データは使用していません')
    await expect(dialog).toContainText('AIは診断・治療・看護判断を行わず')
    await expect(dialog).toContainText('Next.js · TypeScript · Web Speech API · AI API')
    await expect(dialog.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
      'href',
      'https://handover-ai-chi.vercel.app',
    )
    await expect(dialog.getByRole('link', { name: /GitHub/ })).toHaveCount(0)
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()

    const pageWidth = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(pageWidth.scrollWidth).toBeLessThanOrEqual(pageWidth.clientWidth)
  }

  expect(consoleErrors).toEqual([])
  expect(pageErrors).toEqual([])
})

test('mobile menu reaches the requested sales sections', async ({ page }) => {
  test.setTimeout(120_000)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })

  const menuButton = page.getByRole('button', { name: 'メニューを開く' })
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  await menuButton.click()
  await expect(page.getByRole('button', { name: 'メニューを閉じる' })).toHaveAttribute('aria-expanded', 'true')

  await page.getByRole('link', { name: '医療・介護', exact: true }).click()
  await expect(page).toHaveURL(/#healthcare$/)
  await expect(page.locator('#healthcare')).toBeInViewport()
  await expect(page.getByRole('button', { name: 'メニューを開く' })).toHaveAttribute('aria-expanded', 'false')

  const pageWidth = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))
  expect(pageWidth.scrollWidth).toBeLessThanOrEqual(pageWidth.clientWidth)
})

for (const viewport of viewports) {
  test(`archive and pizza image at ${viewport.width}px`, async ({ page, request }) => {
    test.setTimeout(120_000)

    const consoleErrors: string[] = []
    const failedRequests: string[] = []
    const errorResponses: string[] = []

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    page.on('requestfailed', (failedRequest) => {
      const errorText = failedRequest.failure()?.errorText ?? 'unknown error'
      const isCancelledLazyImage =
        errorText === 'net::ERR_ABORTED' && failedRequest.url().includes('/_next/image?')
      if (!isCancelledLazyImage) failedRequests.push(`${failedRequest.url()} — ${errorText}`)
    })
    page.on('response', (response) => {
      if (response.status() >= 400) errorResponses.push(`${response.status()} ${response.url()}`)
    })

    await page.setViewportSize(viewport)
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })

    const archive = page.locator('#archive')
    const archiveCards = archive.locator('article')
    const expandButton = page.getByRole('button', { name: 'すべての実績を見る（29件）' })

    await expect(expandButton).toHaveAttribute('aria-expanded', 'false')
    await expect(expandButton).toHaveAttribute('aria-controls', 'works-archive-projects')
    await expect(archiveCards).toHaveCount(0)

    const initialHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    const buttonBox = await expandButton.boundingBox()
    expect(buttonBox).not.toBeNull()
    expect(buttonBox!.x).toBeGreaterThanOrEqual(0)
    expect(buttonBox!.x + buttonBox!.width).toBeLessThanOrEqual(viewport.width)

    await expandButton.click()
    await expect(page.getByRole('button', { name: '閉じる' }).first()).toHaveAttribute('aria-expanded', 'true')
    await expect(archiveCards).toHaveCount(29)

    const expandedHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    expect(expandedHeight).toBeGreaterThan(initialHeight)

    const pizzaCard = archive.locator('article', {
      has: page.getByRole('heading', { name: 'NEW YORK PIZZA HOUSE', exact: true }),
    })
    const pizzaImage = pizzaCard.locator('img')

    await pizzaCard.scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        pizzaImage.evaluate((image) => {
          const imageElement = image as HTMLImageElement
          return imageElement.complete && imageElement.naturalWidth
        }),
      )
      .toBeGreaterThan(0)

    const pizzaImageState = await pizzaImage.evaluate((image) => {
      const imageElement = image as HTMLImageElement
      return {
        src: imageElement.currentSrc,
        naturalWidth: imageElement.naturalWidth,
        naturalHeight: imageElement.naturalHeight,
        alt: imageElement.alt,
      }
    })
    expect(pizzaImageState.src).toContain('new-york-pizza-house.jpg')
    expect(pizzaImageState.naturalWidth).toBeGreaterThan(0)
    expect(pizzaImageState.naturalHeight).toBeGreaterThan(0)
    expect(pizzaImageState.alt).toContain('NEW YORK PIZZA HOUSE')

    const imageResponse = await request.get(pizzaImageState.src)
    expect(imageResponse.status()).toBe(200)
    expect(imageResponse.headers()['content-type']).toMatch(/^image\//)

    const titleFits = await pizzaCard.getByRole('heading', { name: 'NEW YORK PIZZA HOUSE' }).evaluate(
      (heading) => heading.scrollWidth <= heading.clientWidth,
    )
    expect(titleFits).toBe(true)

    await pizzaCard.getByRole('button', { name: /詳しく見る/ }).click()
    await expect(page.getByRole('dialog', { name: 'NEW YORK PIZZA HOUSE' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'NEW YORK PIZZA HOUSE' })).toBeHidden()

    const categoryButtons = archive.locator('.works-tabs button')
    const categoryCount = await categoryButtons.count()
    for (let index = 0; index < categoryCount; index += 1) {
      const categoryButton = categoryButtons.nth(index)
      const expectedCount = Number(await categoryButton.locator('span').textContent())
      await categoryButton.click()
      await expect(archiveCards).toHaveCount(expectedCount)
      await expect(page.getByRole('button', { name: '閉じる' }).first()).toHaveAttribute('aria-expanded', 'true')
    }

    await categoryButtons.first().click()
    await expect(archiveCards).toHaveCount(29)

    const pageWidth = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(pageWidth.scrollWidth).toBeLessThanOrEqual(pageWidth.clientWidth)

    await page.getByRole('button', { name: '閉じる' }).last().click()
    await expect(archiveCards).toHaveCount(0)
    await expect(expandButton).toHaveAttribute('aria-expanded', 'false')
    await expect(expandButton).toBeFocused()

    await page.reload({ waitUntil: 'load' })
    await expect(page.locator('#archive article')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'すべての実績を見る（29件）' })).toHaveAttribute('aria-expanded', 'false')

    expect(consoleErrors).toEqual([])
    expect(failedRequests).toEqual([])
    expect(errorResponses).toEqual([])
  })
}

/**
 * Counting cards in the DOM is not enough: the archive regressed once with all
 * 29 articles mounted but left at `opacity: 0` by a scroll-triggered reveal,
 * which reads to a visitor as an empty archive. These assertions are about what
 * is actually on screen, without scrolling first.
 */
const EXPECTED_CATEGORY_COUNTS = [
  ['AIのしくみ', 2],
  ['作業の自動化', 1],
  ['仕事用アプリ', 6],
  ['ホームページ', 4],
  ['1ページの紹介サイト', 11],
  ['ネットショップ', 5],
] as const

const ARCHIVE_TOTAL = 29

for (const viewport of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const) {
  test(`archive cards are rendered visible, not just mounted, at ${viewport.width}px`, async ({ page }) => {
    test.setTimeout(120_000)

    const consoleErrors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`))

    await page.setViewportSize(viewport)
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })

    const archive = page.locator('#archive')
    const cards = archive.locator('article')

    /** Cards that a visitor can actually see: laid out and fully faded in. */
    const shownCards = () =>
      cards.evaluateAll(
        (elements) =>
          elements.filter((element) => {
            const style = getComputedStyle(element)
            const box = element.getBoundingClientRect()
            return (
              Number(style.opacity) > 0.9 &&
              style.visibility !== 'hidden' &&
              box.width > 0 &&
              box.height > 0
            )
          }).length,
      )

    const expandButton = page.getByRole('button', { name: 'すべての実績を見る（29件）' })
    const showLessButton = page.getByRole('button', { name: '閉じる' }).first()
    const tab = (name: string) =>
      archive.locator('.works-tabs button', { hasText: new RegExp(`^${name}`) }).first()

    await expect(expandButton).toHaveAttribute('aria-expanded', 'false')
    await expect(cards).toHaveCount(0)

    await archive.scrollIntoViewIfNeeded()
    await expandButton.click()
    await expect(showLessButton).toHaveAttribute('aria-expanded', 'true')
    await expect(cards).toHaveCount(ARCHIVE_TOTAL)
    await expect.poll(shownCards).toBe(ARCHIVE_TOTAL)

    for (const [category, expected] of EXPECTED_CATEGORY_COUNTS) {
      await tab(category).click()
      await expect(cards).toHaveCount(expected)
      await expect.poll(shownCards).toBe(expected)
      await expect(showLessButton).toHaveAttribute('aria-expanded', 'true')
    }

    // Returning to All from a category must restore all 29, still on screen.
    await tab('すべて').click()
    await expect(cards).toHaveCount(ARCHIVE_TOTAL)
    await expect.poll(shownCards).toBe(ARCHIVE_TOTAL)

    await showLessButton.click()
    await expect(cards).toHaveCount(0)
    await expect(expandButton).toHaveAttribute('aria-expanded', 'false')

    await expandButton.click()
    await expect(cards).toHaveCount(ARCHIVE_TOTAL)
    await expect.poll(shownCards).toBe(ARCHIVE_TOTAL)

    expect(consoleErrors).toEqual([])
  })
}
