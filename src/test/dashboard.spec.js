const { test, expect } = require('@playwright/test');
const {
    login,
    USERS
} = require('./utils/testHelpers');

// ---------- HELPER ---------- //


async function reachDashboard(page, userKey = 'sneha') {
    await login(page, userKey);

    //  FIX: wait for navigation state
    await Promise.race([
        page.waitForURL(/dashboard|InstituteList|roles/, { timeout: 5000 }),
        page.waitForTimeout(1000) // fallback
    ]);

    const maxSteps = 6;

    for (let step = 0; step < maxSteps; step++) {
        const url = page.url();
        console.log('STEP:', step, 'URL:', url);

        if (url.includes('/dashboard')) {
            await page.waitForSelector('.header-title');
            return;
        }

        if (url.includes('InstituteList')) {
            const institutes = page.locator('.card-row > div');

            if (await institutes.count() > 0) {
                await institutes.first().click();
                await page.waitForLoadState('networkidle');
                continue;
            }
        }

        if (url.includes('roles')) {
            const roles = page.locator('.card-row > div');

            if (await roles.count() > 0) {
                await roles.first().click();
                await page.waitForLoadState('networkidle');
                continue;
            }
        }

        await page.waitForTimeout(500);
    }

    throw new Error(`❌ Failed to reach dashboard. Final URL: ${page.url()}`);
}
// ---------- TESTS ---------- //

//  TC01 - Dashboard loads
test('TC01 - Dashboard Load', async ({ page }) => {
    await reachDashboard(page);

    const heading = page.locator('.header-title');

    await expect(heading).toHaveText('Welcome to SchoolCoreOS');
    await expect(heading).toBeVisible();
});

//  TC02 - Header visible (STRICT)
test('TC02 - Header Visible', async ({ page }) => {
    await reachDashboard(page);

    await expect(
        page.getByRole('heading', { name: 'Welcome to SchoolCoreOS' })
    ).toBeVisible();
});

//  TC03 - Role subtitle visible
test('TC03 - Role Subtitle', async ({ page }) => {
    await reachDashboard(page);

    const subtitle = page.locator('.header-subtitle').first();

    await expect(subtitle).toBeVisible();

    // Validate pattern: "<Role> Panel"
    await expect(subtitle).toHaveText(/.+ Panel$/);
});

//  TC04 - Dashboard cards render
test('TC04 - Cards Render', async ({ page }) => {
    await reachDashboard(page);

    const cards = page.locator('.generic-card');

    // ✅ WAIT until 4 cards are rendered
    await expect(cards).toHaveCount(4);

    // ✅ THEN check visibility
    await expect(cards.first()).toBeVisible();
});

//  TC05 - Card content visible
test('TC05 - Card Content', async ({ page }) => {
    await reachDashboard(page);

    await expect(page.locator('.card-title')).toContainText([
        'Active Institutes',
        'Total Users'
    ]);
});

//  TC06 - Logout works
test('TC06 - Logout Functionality', async ({ page }) => {
    await reachDashboard(page);

    await page.getByRole('button', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/\/$/);
});

//  TC07 - Logout clears session
test('TC07 - Logout Clears LocalStorage', async ({ page }) => {
    await reachDashboard(page);

    await page.getByRole('button', { name: 'Logout' }).click();

    const user = await page.evaluate(() => localStorage.getItem('user'));
    expect(user).toBeNull();
});

//  TC08 - Refresh behavior (REALISTIC)
test('TC08 - Refresh Redirect', async ({ page }) => {
    await reachDashboard(page);

    await page.reload();

    const url = page.url();

    expect(
        url.includes('/dashboard') ||
        url.includes('/InstituteList') ||
        url.endsWith('/')
    ).toBeTruthy();
});

//  TC09 - Direct access blocked
test('TC09 - Direct Dashboard Access', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');

    await expect(
        page.getByRole('heading', { name: 'Welcome to SchoolCoreOS' })
    ).not.toBeVisible();
});

//  TC10 - Session exists before logout
test('TC10 - Session Exists Before Logout', async ({ page }) => {
    await reachDashboard(page);

    const user = await page.evaluate(() => localStorage.getItem('user'));

    expect(user).toBeTruthy();
});

//  TC11 - UI stable on scroll
test('TC11 - UI Stable on Scroll', async ({ page }) => {
    await reachDashboard(page);

    await page.mouse.wheel(0, 500);

    await expect(
        page.getByRole('heading', { name: 'Welcome to SchoolCoreOS' })
    ).toBeVisible();
});

//  TC12 - Card click safe
test('TC12 - Card Click Safety', async ({ page }) => {
    await reachDashboard(page);

    const card = page.locator('.generic-card').first();

    await card.click();

    await expect(
        page.getByRole('heading', { name: 'Welcome to SchoolCoreOS' })
    ).toBeVisible();
});
// TC13 - Direct dashboard blocked
test('TC13 - Direct Dashboard Access Blocked', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');


    await expect(page.locator('.header-title')).not.toBeVisible();
});
// TC14 - Session restore
test('TC14 - Session Restore After Refresh', async ({ page }) => {
    await login(page, 'sneha');
    await reachDashboard(page);

    await page.reload();

    await expect(page.locator('.header-title')).toBeVisible();
});

// TC15 - Logout persistence
test('TC15 - Logout Persistence', async ({ page }) => {
    await login(page, 'sneha');
    await reachDashboard(page);

    await page.getByRole('button', { name: 'Logout' }).click();

    await page.reload();

    await expect(page).toHaveURL('http://localhost:3000/');
});

// tc16 - dark mode toggle
test('TC16 - Dark Mode Persistence (Login → Dashboard)', async ({ page }) => {

    await page.goto('http://localhost:3000');

    //  FIX: avoid strict mode error
    const app = page.locator('.app').first();

    await app.waitFor({ state: 'visible' });

    //  Toggle dark mode
    await page.locator('.toggle-mode').click();

    await expect(app).toHaveClass(/dark/);

    //  Login
    await page.getByPlaceholder('Enter phone or email').fill('sneha@scos.com');
    await page.getByPlaceholder('Password').fill('temp123');

    await page.getByRole('button', { name: 'Continue' }).click();

    await page.waitForLoadState('networkidle');

    //  Navigate to dashboard
    const institutes = page.locator('.card-row > div');

    if (await institutes.count()) {
        await institutes.first().click();
        await page.waitForLoadState('networkidle');
    }

    const roles = page.locator('.card-row > div');

    if (await roles.count()) {
        await roles.first().click();
        await page.waitForLoadState('networkidle');
    }

    await expect(app).toHaveClass(/dark/);
});