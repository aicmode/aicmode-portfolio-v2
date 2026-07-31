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

  await expect(page).toHaveTitle('AICMODE | AI Systems, Business Automation & Web Applications')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /鹿児島を拠点に、AIシステム、業務自動化/,
  )
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('#top')).toContainText('業務の課題を整理し、')
  await expect(page.locator('#case-studies article')).toHaveCount(6)
  await expect(page.locator('#healthcare')).toContainText('看護師として約9年間')

  const servicesCta = page.getByRole('link', { name: '相談できることを見る' })
  const worksCta = page.getByRole('link', { name: '制作事例を見る' })
  await expect(servicesCta).toHaveAttribute('href', '#services')
  await expect(worksCta).toHaveAttribute('href', '#works')

  const firstCase = page.locator('#case-studies article').first()
  await expect(firstCase).toContainText('Role')
  await expect(firstCase).toContainText('Project Type')
  await expect(firstCase).toContainText('Status')
  const caseTrigger = firstCase.getByRole('button', { name: 'View Case Study' })
  await caseTrigger.click()
  const caseDialog = page.getByRole('dialog', { name: 'MediBrief' })
  await expect(caseDialog).toBeVisible()
  await expect(caseDialog).toContainText('Self-directed Project')
  await page.keyboard.press('Escape')
  await expect(caseDialog).toBeHidden()
  await expect(caseTrigger).toBeFocused()

  const firstWork = page.locator('#works article').first()
  const workName = await firstWork.getByRole('heading').textContent()
  await firstWork.getByRole('button', { name: /Details/ }).click()
  const workDialog = page.getByRole('dialog', { name: workName ?? '' })
  await expect(workDialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(workDialog).toBeHidden()

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

test('mobile menu reaches the requested sales sections', async ({ page }) => {
  test.setTimeout(120_000)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })

  const menuButton = page.getByRole('button', { name: 'メニューを開く' })
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  await menuButton.click()
  await expect(page.getByRole('button', { name: 'メニューを閉じる' })).toHaveAttribute('aria-expanded', 'true')

  await page.getByRole('link', { name: 'HEALTHCARE', exact: true }).click()
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
      failedRequests.push(`${failedRequest.url()} — ${failedRequest.failure()?.errorText ?? 'unknown error'}`)
    })
    page.on('response', (response) => {
      if (response.status() >= 400) errorResponses.push(`${response.status()} ${response.url()}`)
    })

    await page.setViewportSize(viewport)
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })

    const archive = page.locator('#archive')
    const archiveCards = archive.locator('article')
    const expandButton = page.getByRole('button', { name: 'VIEW ALL 26 WORKS' })

    await expect(expandButton).toHaveAttribute('aria-expanded', 'false')
    await expect(expandButton).toHaveAttribute('aria-controls', 'works-archive-projects')
    await expect(archiveCards).toHaveCount(0)

    const initialHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    const buttonBox = await expandButton.boundingBox()
    expect(buttonBox).not.toBeNull()
    expect(buttonBox!.x).toBeGreaterThanOrEqual(0)
    expect(buttonBox!.x + buttonBox!.width).toBeLessThanOrEqual(viewport.width)

    await expandButton.click()
    await expect(page.getByRole('button', { name: 'SHOW LESS' }).first()).toHaveAttribute('aria-expanded', 'true')
    await expect(archiveCards).toHaveCount(26)

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

    await pizzaCard.getByRole('button', { name: /Details/ }).click()
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
      await expect(page.getByRole('button', { name: 'SHOW LESS' }).first()).toHaveAttribute('aria-expanded', 'true')
    }

    await categoryButtons.first().click()
    await expect(archiveCards).toHaveCount(26)

    const pageWidth = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(pageWidth.scrollWidth).toBeLessThanOrEqual(pageWidth.clientWidth)

    await page.getByRole('button', { name: 'SHOW LESS' }).last().click()
    await expect(archiveCards).toHaveCount(0)
    await expect(expandButton).toHaveAttribute('aria-expanded', 'false')
    await expect(expandButton).toBeFocused()

    await page.reload({ waitUntil: 'networkidle' })
    await expect(page.locator('#archive article')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'VIEW ALL 26 WORKS' })).toHaveAttribute('aria-expanded', 'false')

    expect(consoleErrors).toEqual([])
    expect(failedRequests).toEqual([])
    expect(errorResponses).toEqual([])
  })
}

/**
 * Counting cards in the DOM is not enough: the archive regressed once with all
 * 26 articles mounted but left at `opacity: 0` by a scroll-triggered reveal,
 * which reads to a visitor as an empty archive. These assertions are about what
 * is actually on screen, without scrolling first.
 */
const EXPECTED_CATEGORY_COUNTS = [
  ['AI Systems', 1],
  ['Web Applications', 5],
  ['Websites', 4],
  ['Landing Pages', 11],
  ['EC', 5],
] as const

const ARCHIVE_TOTAL = 26

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

    const expandButton = page.getByRole('button', { name: 'VIEW ALL 26 WORKS' })
    const showLessButton = page.getByRole('button', { name: 'SHOW LESS' }).first()
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

    // Returning to All from a category must restore all 26, still on screen.
    await tab('All').click()
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
