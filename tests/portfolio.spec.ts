import { expect, test } from 'playwright/test'

const viewports = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
] as const

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
