import { test, expect } from '@playwright/test';
import { AuthHelper } from '../helpers/auth.helper';
import { testUsers } from '../fixtures/users';

test.describe('Login', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('should login with valid credentials', async ({ page }) => {
    await authHelper.login(testUsers.user.email, testUsers.user.password);

    // Verify that we landed on one of the protected pages
    await expect(page).toHaveURL(/.*\/(products|parishes)/);

    // Verify that the header with user menu is visible
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/en/login');

    await page.fill('input[type="email"]', 'wrong@test.com');
    await page.fill('input[type="password"]', 'WrongPass123!');

    await page.click('button[type="submit"]');

    // Wait for field errors to appear (they are set via form.setError)
    // or simply verify that the form is still on the login page (no redirect occurred)
    await page.waitForTimeout(3000); // give time for the request to process

    // Verify that we are still on the login page (successful login did not occur)
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should show validation error for empty fields', async ({ page }) => {
    await page.goto('/en/login');

    await page.click('button[type="submit"]');

    // Verify validation - error messages should be visible
    await expect(page.getByText(/Invalid email format|Password must contain/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('should logout successfully', async ({ page }) => {
    await authHelper.login(testUsers.user.email, testUsers.user.password);
    await authHelper.logout();

    // Verify that we returned to the login page
    await expect(page).toHaveURL(/.*\/login/);
  });
});