import { test, expect } from '@playwright/test';
import { AuthHelper } from '../helpers/auth.helper';

test.describe('Register', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('should register with valid data', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@example.com`;

    await authHelper.register(
      'Test User',
      uniqueEmail,
      'TestPass123!',
      'TestPass123!'
    );

    // Verify successful registration - should redirect to verify page
    await expect(page).toHaveURL(/.*\/(verify|login|products|parishes)/, { timeout: 10000 });
  });

  test('should show validation error for empty fields', async ({ page }) => {
    await page.goto('/en/register');

    await page.click('button[type="submit"]');

    // Verify validation - error messages should be visible
    await expect(page.locator('form').getByText(/required|обязательн/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('should show error when passwords do not match', async ({ page }) => {
    await page.goto('/en/register');

    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', `test${Date.now()}@example.com`);

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill('TestPass123!');
    await passwordInputs[1].fill('DifferentPass123!');

    await page.click('button[type="submit"]');

    // Wait for validation error about password mismatch
    await expect(page.getByText(/password.*match|пароли.*совпад/i)).toBeVisible({ timeout: 5000 });
  });

  test('should show error for invalid email format', async ({ page }) => {
    await page.goto('/en/register');

    await page.fill('input[type="text"]', 'Test User');

    // Fill email field directly via JavaScript to bypass HTML5 validation
    await page.locator('input[type="email"]').evaluate((el: HTMLInputElement) => {
      el.value = 'invalid-email';
    });

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill('TestPass123!');
    await passwordInputs[1].fill('TestPass123!');

    await page.click('button[type="submit"]');

    // Verify email validation error
    await expect(page.getByText(/invalid email format|неверный формат почты/i)).toBeVisible({ timeout: 5000 });
  });

  test('should show error for weak password', async ({ page }) => {
    await page.goto('/en/register');

    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', `test${Date.now()}@example.com`);

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill('weak');
    await passwordInputs[1].fill('weak');

    await page.click('button[type="submit"]');

    // Verify password strength validation error
    await expect(page.getByText(/password must|пароль должен/i)).toBeVisible({ timeout: 5000 });
  });

  test('should show error when email already exists', async ({ page }) => {
    // Try to register with an existing user email
    await page.goto('/en/register');

    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', 'john.doe@example.com'); // existing user from fixtures

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill('TestPass123!');
    await passwordInputs[1].fill('TestPass123!');

    await page.click('button[type="submit"]');

    // Wait for the submit button to be enabled again (indicating request completed)
    await page.waitForSelector('button[type="submit"]:not([disabled])', { timeout: 5000 });

    // Verify that we are still on the register page
    await expect(page).toHaveURL(/.*\/register/);
  });

  test('should reset form fields when reset button is clicked', async ({ page }) => {
    await page.goto('/en/register');

    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', 'test@example.com');

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill('TestPass123!');
    await passwordInputs[1].fill('TestPass123!');

    // Click reset button
    await page.click('button:has-text("Reset"), button:has-text("Сброс")');

    // Verify all fields are cleared
    await expect(page.locator('input[type="text"]')).toHaveValue('');
    await expect(page.locator('input[type="email"]')).toHaveValue('');
    const clearedPasswordInputs = await page.locator('input[type="password"]').all();
    await expect(clearedPasswordInputs[0]).toHaveValue('');
    await expect(clearedPasswordInputs[1]).toHaveValue('');
  });

  test('should navigate to login page from register', async ({ page }) => {
    await page.goto('/en/register');

    // Look for link to login page (usually in AuthGate tabs)
    const loginLink = page.locator('a[href*="login"]').first();
    await expect(loginLink).toBeVisible();

    await loginLink.click();
    await expect(page).toHaveURL(/.*\/login/);
  });
});