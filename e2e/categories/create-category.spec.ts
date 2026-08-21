import { test, expect } from '@playwright/test';
import { AuthHelper } from '../helpers/auth.helper';
import { testUsers } from '../fixtures/users';

test.describe('Create Category', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
    await authHelper.login(testUsers.admin.email, testUsers.admin.password);
    await page.goto('/en/categories');
  });

  test('should open create category modal when clicking create button', async ({ page }) => {
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Close the sidebar first
    const sidebarSwitch = page.locator('label[aria-label="side panel of the switch"]');
    await sidebarSwitch.click();

    // Find the CirclePlusButton by aria-label and wait for it to be visible
    const createButton = page.locator('button[aria-label="Add"]');
    await createButton.waitFor({ state: 'visible', timeout: 10000 });
    await createButton.click();

    // Verify modal is opened
    await expect(page.locator('[role="dialog"]')).toBeVisible({ timeout: 5000 });
  });

  test('should create category with valid data', async ({ page }) => {
    const uniqueName = `Test Category ${Date.now()}`;

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Close the sidebar first
    const sidebarSwitch = page.locator('label[aria-label="side panel of the switch"]');
    await sidebarSwitch.click();

    // Click create button
    const createButton = page.locator('button[aria-label="Add"]');
    await createButton.waitFor({ state: 'visible', timeout: 10000 });
    await createButton.click();

    // Wait for modal to be visible
    await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 5000 });

    // Switch to Russian tab first (since default is EN based on locale)
    await page.click('[role="tab"]:has-text("RU"), [role="tab"]:has-text("Русский")');

    // Wait for the Russian input to be visible
    await page.waitForSelector('input[name="translations.ru.title"]', { state: 'visible', timeout: 5000 });

    // Fill in Russian translation (correct field name)
    await page.fill('input[name="translations.ru.title"]', uniqueName);

    // Switch to English tab
    await page.click('[role="tab"]:has-text("EN"), [role="tab"]:has-text("English")');

    // Wait for English input to be visible
    await page.waitForSelector('input[name="translations.en.title"]', { state: 'visible' });

    // Fill in English translation
    await page.fill('input[name="translations.en.title"]', `${uniqueName} EN`);

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for modal to close
    await expect(page.locator('[role="dialog"]')).not.toBeVisible({ timeout: 10000 });

    // Verify category appears in the list
    await expect(page.getByText(uniqueName)).toBeVisible({ timeout: 5000 });
  });

  test('should show validation error for empty required fields', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Close the sidebar first
    const sidebarSwitch = page.locator('label[aria-label="side panel of the switch"]');
    await sidebarSwitch.click();

    const createButton = page.locator('button[aria-label="Add"]');
    await createButton.waitFor({ state: 'visible', timeout: 10000 });
    await createButton.click();

    await page.waitForSelector('[role="dialog"]', { state: 'visible' });

    // Try to submit without filling fields
    await page.click('button[type="submit"]');

    // Verify validation error appears (English: "At least 3 chars" or Russian: "От 3 символов")
    await expect(page.locator('form').getByText(/At least 3 chars|От 3 символов/i).first()).toBeVisible({ timeout: 5000 });

    // Wait for any pending network requests to complete before test ends
    await page.waitForLoadState('networkidle');
  });

  test('should reset form when clicking reset button', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Close the sidebar first
    const sidebarSwitch = page.locator('label[aria-label="side panel of the switch"]');
    await sidebarSwitch.click();

    const createButton = page.locator('button[aria-label="Add"]');
    await createButton.waitFor({ state: 'visible', timeout: 10000 });
    await createButton.click();

    await page.waitForSelector('[role="dialog"]', { state: 'visible' });

    // Switch to Russian tab first (since default is EN based on locale)
    await page.click('[role="tab"]:has-text("RU"), [role="tab"]:has-text("Русский")');

    // Wait for the Russian input to be visible
    await page.waitForSelector('input[name="translations.ru.title"]', { state: 'visible', timeout: 5000 });

    // Fill some data
    await page.fill('input[name="translations.ru.title"]', 'Test Name');

    // Click reset button (Clear/Очистить)
    await page.click('button[type="button"]:has-text("Clear"), button[type="button"]:has-text("Очистить")');

    // Verify field is cleared
    await expect(page.locator('input[name="translations.ru.title"]')).toHaveValue('');
  });

  test('should switch between translation tabs', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Close the sidebar first
    const sidebarSwitch = page.locator('label[aria-label="side panel of the switch"]');
    await sidebarSwitch.click();

    const createButton = page.locator('button[aria-label="Add"]');
    await createButton.waitFor({ state: 'visible', timeout: 10000 });
    await createButton.click();

    await page.waitForSelector('[role="dialog"]', { state: 'visible' });

    // Switch to Russian tab first (since default is EN based on locale)
    await page.click('[role="tab"]:has-text("RU"), [role="tab"]:has-text("Русский")');

    // Wait for the Russian input to be visible
    await page.waitForSelector('input[name="translations.ru.title"]', { state: 'visible', timeout: 5000 });

    // Fill Russian tab
    await page.fill('input[name="translations.ru.title"]', 'Русское название');

    // Switch to English tab
    await page.click('[role="tab"]:has-text("EN"), [role="tab"]:has-text("English")');

    // Wait for English input to be visible
    await page.waitForSelector('input[name="translations.en.title"]', { state: 'visible', timeout: 5000 });

    // Verify English field is visible
    await expect(page.locator('input[name="translations.en.title"]')).toBeVisible();

    // Fill English tab
    await page.fill('input[name="translations.en.title"]', 'English Title');

    // Switch back to Russian tab
    await page.click('[role="tab"]:has-text("RU"), [role="tab"]:has-text("Русский")');

    // Wait for Russian input to be visible again
    await page.waitForSelector('input[name="translations.ru.title"]', { state: 'visible', timeout: 5000 });

    // Verify Russian field still has value
    await expect(page.locator('input[name="translations.ru.title"]')).toHaveValue('Русское название');
  });

  test('should hide create button for non-admin users', async ({ page }) => {
    await authHelper.logout();
    await authHelper.login(testUsers.user.email, testUsers.user.password);

    // Navigate to categories after login completes
    await page.goto('/en/categories', { waitUntil: 'networkidle' });

    // Verify create button is not visible for regular users
    const createButton = page.locator('button[aria-label="Add"]');
    // The button should not exist or not be visible
    const count = await createButton.count();
    expect(count).toBe(0);

    // Wait for any pending requests before test ends
    await page.waitForLoadState('networkidle');
  });
});
