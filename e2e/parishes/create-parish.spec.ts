import { test, expect } from '@playwright/test';
import { AuthHelper } from '../helpers/auth.helper';
import { testUsers } from '../fixtures/users';

// Запускаем тесты последовательно, не параллельно
test.describe.configure({ mode: 'serial' });

test.describe('Create Parish', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
    await authHelper.login(testUsers.admin.email, testUsers.admin.password);
    await page.goto('/en/parishes');
  });

  test('should open create parish modal when clicking create button', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const sidebarSwitch = page.locator('label[aria-label="side panel of the switch"]');
    await sidebarSwitch.click();
    const createButton = page.locator('button[aria-label="Add"]');
    await createButton.waitFor({ state: 'visible', timeout: 10000 });
    await createButton.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible({ timeout: 5000 });
  });

  test('should create parish with valid data', async ({ page }) => {
    const uniqueName = `Test Parish ${Date.now()}`;
    await page.waitForLoadState('networkidle');

    const sidebarSwitch = page.locator('label[aria-label="side panel of the switch"]');
    await sidebarSwitch.click();

    const createButton = page.locator('button[aria-label="Add"]');
    await createButton.waitFor({ state: 'visible', timeout: 10000 });

    await createButton.click();
    await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 5000 });

    // 1. Переключиться на RU таб
    await page.click('[role="tab"]:has-text("RU"), [role="tab"]:has-text("Русский")');
    await page.waitForSelector('input[name="translations.ru.title"]', { state: 'visible', timeout: 5000 });

    // 2. Заполнить RU: title + description
    await page.fill('input[name="translations.ru.title"]', uniqueName);
    await page.fill('textarea[name="translations.ru.description"]', `${uniqueName} Description`);

    // 3. Переключиться на EN таб
    await page.click('[role="tab"]:has-text("EN"), [role="tab"]:has-text("English")');
    await page.waitForSelector('input[name="translations.en.title"]', { state: 'visible' });

    // 4. Заполнить EN: title + description
    await page.fill('input[name="translations.en.title"]', `${uniqueName} EN`);
    await page.fill('textarea[name="translations.en.description"]', `${uniqueName} EN Description`);

    // 5. Выбрать дату доставки
    const deliveryDateButton = page.locator('[data-testid="delivery-date-button"]');
    await deliveryDateButton.scrollIntoViewIfNeeded();

    await deliveryDateButton.click();
    // Ждем появления календаря и выбираем первую enabled дату
    await page.waitForSelector('[role="grid"]', { state: 'visible', timeout: 5000 });
    const dateButton = page.locator('[role="gridcell"]:not([aria-disabled="true"]) button:not([disabled])').first();
    await dateButton.waitFor({ state: 'visible', timeout: 5000 });
    await dateButton.click();

    // 6. Отправить форму
    await page.click('button[type="submit"]');
    // Ждем закрытия модалки формы (не путать с календарем)
    await expect(page.locator('[role="dialog"]:has(form)')).not.toBeVisible({ timeout: 10000 });
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
    await expect(page.locator('form').getByText(/At least 3 chars|От 3 символов/i).first()).toBeVisible({
      timeout: 5000
    });

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
    await page.fill('textarea[name="translations.ru.description"]', 'Test Description');

    // Scroll to and open date picker
    const deliveryDateButton = page.locator('[data-testid="delivery-date-button"]');
    await deliveryDateButton.scrollIntoViewIfNeeded();
    await deliveryDateButton.click();

    // Ждем появления календаря и выбираем первую enabled дату
    await page.waitForSelector('[role="grid"]', { state: 'visible', timeout: 5000 });
    const dateButton = page.locator('[role="gridcell"]:not([aria-disabled="true"]) button:not([disabled])').first();
    await dateButton.waitFor({ state: 'visible', timeout: 5000 });
    await dateButton.click();


    // Click reset button (Clear/Очистить)
    await page.click('button[type="button"]:has-text("Clear"), button[type="button"]:has-text("Очистить")');

    // Verify fields are cleared
    await expect(page.locator('input[name="translations.ru.title"]')).toHaveValue('');
    await expect(page.locator('textarea[name="translations.ru.description"]')).toHaveValue('');
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

    // Wait for the Russian inputs to be visible
    await page.waitForSelector('input[name="translations.ru.title"]', { state: 'visible', timeout: 5000 });

    // Fill Russian tab
    await page.fill('input[name="translations.ru.title"]', 'Русское название');
    await page.fill('textarea[name="translations.ru.description"]', 'Русское описание');

    // Switch to English tab
    await page.click('[role="tab"]:has-text("EN"), [role="tab"]:has-text("English")');

    // Wait for English inputs to be visible
    await page.waitForSelector('input[name="translations.en.title"]', { state: 'visible', timeout: 5000 });

    // Verify English fields are visible
    await expect(page.locator('input[name="translations.en.title"]')).toBeVisible();
    await expect(page.locator('textarea[name="translations.en.description"]')).toBeVisible();

    // Fill English tab
    await page.fill('input[name="translations.en.title"]', 'English Title');
    await page.fill('textarea[name="translations.en.description"]', 'English Description');

    // Switch back to Russian tab
    await page.click('[role="tab"]:has-text("RU"), [role="tab"]:has-text("Русский")');

    // Wait for Russian inputs to be visible again
    await page.waitForSelector('input[name="translations.ru.title"]', { state: 'visible', timeout: 5000 });

    // Verify Russian fields still have values
    await expect(page.locator('input[name="translations.ru.title"]')).toHaveValue('Русское название');
    await expect(page.locator('textarea[name="translations.ru.description"]')).toHaveValue('Русское описание');
  });

  test('should hide create button for non-admin users', async ({ page }) => {
    await authHelper.logout();
    await authHelper.login(testUsers.user.email, testUsers.user.password);

    // Navigate to parishes after login completes
    await page.goto('/en/parishes', { waitUntil: 'networkidle' });

    // Verify create button is not visible for regular users
    const createButton = page.locator('button[aria-label="Add"]');
    // The button should not exist or not be visible
    const count = await createButton.count();
    expect(count).toBe(0);

    // Wait for any pending requests before test ends
    await page.waitForLoadState('networkidle');

  });
});