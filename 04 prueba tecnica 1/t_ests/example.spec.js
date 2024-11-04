
import { test, expect } from "@playwright/test"

const LOCALHOST_URL = "http://localhost:5173/"
test('ap shows random fact and imgage', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole("paragraph")
  const image = await page.getByRole("img")

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute("src")

  await expect(textContent?.length).not.toBeGreaterThan(0)
  await expect(imageSrc?.startsWith("https://cataas.com")).toBeTruthy()

});

