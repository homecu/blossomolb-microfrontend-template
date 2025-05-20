import { test, expect } from '@playwright/test';

test.describe('Button component', () => {
  test('should render and be clickable', async ({ page }) => {
    await page.goto('http://localhost:3001');
    const button = page.getByRole('button', { name: /click/i });
    await expect(button).toBeVisible();
    await button.click();
    // Aquí podrías verificar un efecto secundario, como un alert o cambio de texto
  });
});
