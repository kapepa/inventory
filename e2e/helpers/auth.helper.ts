import { Page } from '@playwright/test';

export class AuthHelper {
  constructor(private page: Page) { }

  async login(email: string, password: string) {
    await this.page.goto('/en/login');

    await this.page.fill('input[type="email"]', email);
    await this.page.fill('input[type="password"]', password);
    await this.page.click('button[type="submit"]');

    // Wait for navigation to complete
    await this.page.waitForURL(/\/(en|ru)\/(parishes|products|categories)/, { timeout: 60000 });
    await this.page.waitForLoadState('networkidle');
  }

  async logout() {
    // Найти кнопку logout в header
    await this.page.click('[data-testid="user-menu"]');
    await this.page.click('[data-testid="logout-button"]');

    // Ждем редиректа на login
    await this.page.waitForURL('**/login');
  }

  async register(name: string, email: string, password: string, confirmPassword: string) {
    await this.page.goto('/en/register');
    await this.page.fill('input[type="text"]', name);
    await this.page.fill('input[type="email"]', email);

    const passwordInputs = await this.page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(password);
    await passwordInputs[1].fill(confirmPassword);

    await this.page.click('button[type="submit"]');

    // Wait for navigation to complete
    await this.page.waitForURL(/\/(en|ru)\/(verify|login|parishes|products|categories)/, { timeout: 60000 });
    await this.page.waitForLoadState('networkidle');
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForSelector('[data-testid="user-menu"]', { timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }
}