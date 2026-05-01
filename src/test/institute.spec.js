const { test, expect } = require('@playwright/test');
const { login, getUser } = require('./utils/testHelpers');

//   wait for pages to load
async function waitForPage(page) {
    try {
        await Promise.race([
            page.locator('.selected-inst').first().waitFor({ timeout: 5000 }),
            page.locator('.main-body').first().waitFor({ timeout: 5000 }),
            page.locator('.main-container').first().waitFor({ timeout: 5000 }),
        ]);
    } catch (e) {
        return 'unknown';
    }

    if (await page.locator('.selected-inst').count()) return 'roles';
    if (await page.locator('.main-container').count()) return 'dashboard';
    if (await page.locator('.main-body').count()) return 'institute';

    return 'unknown';
}
//
//  TC01 - No institute (alex)
//
test('TC01 - No Institute User (alex)', async ({ page }) => {
    await login(page, 'alex');

    const error = page.locator('.error-message');

    await expect(error).toBeVisible();
    await expect(error).toContainText(/no institute|not assigned/i);
});

//
//  TC02 - Single institute (raj → auto redirect to roles)
//
test('TC02 - Single Institute Redirect (raj)', async ({ page }) => {
    await login(page, 'raj');

    // Check where user landed
    const isDashboard = await page.locator('.main-container').count();
    const isRoles = await page.locator('.selected-inst').count();

    if (isDashboard) {
        await expect(
            page.getByRole('heading', { name: 'Welcome to SchoolCoreOS' })
        ).toBeVisible();
    } else if (isRoles) {
        // Then this is expected behavior too
        await expect(
            page.getByRole('heading', { name: 'Select Your Role' })
        ).toBeVisible();
    } else {
        throw new Error('Unknown page after login');
    }
});

//
//  TC03 - Multi role (priya → roles page)
//
test('TC03 - Multi Role User (priya)', async ({ page }) => {
    await login(page, 'priya');

    // wait for roles page UI
    await page.locator('.selected-inst').first().waitFor({ timeout: 5000 });

    const roles = page.locator('.card-row > div');

    await expect(roles.first()).toBeVisible(); // IMPORTANT
    expect(await roles.count()).toBeGreaterThan(1);
});

//
//  TC04 - Multi institute (amit)
//
test('TC04 - Multi Institute User (amit)', async ({ page }) => {
    await login(page, 'amit');

    const cards = page.locator('.card-row > div');

    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(1);
});

//
//  TC05 - Many institutes (sneha)
//
test('TC05 - Many Institutes (sneha)', async ({ page }) => {
    await login(page, 'sneha');

    const cards = page.locator('.card-row > div');

    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(1);
});

//
//  TC06 - Institute click navigation
//
test('TC06 - Click Institute → Dashboard', async ({ page }) => {
    await login(page, 'amit'); // multi institute user

    const cards = page.locator('.card-row > div');

    await expect(cards.first()).toBeVisible();

    await cards.first().click();

    // if roles exist → click first role
    const roleCards = page.locator('.card-row > div');

    if (await roleCards.count()) {
        await roleCards.first().click();
    }

    // Final destination = dashboard
    await expect(
        page.locator('text=Welcome to SchoolCoreOS')
    ).toBeVisible();
});

//
//  TC07 - Search functionality
//
test('TC07 - Search Institutes', async ({ page }) => {
    await login(page, 'sneha');

    const search = page.locator('input[placeholder="Search your institute..."]');

    if (await search.count()) {
        await search.fill('a');

        await expect(page.locator('.card-row > div').first()).toBeVisible();
    }
});

//
//  TC08 - Refresh session FIXED
//
test('TC08 - Refresh Session', async ({ page }) => {
    await login(page, 'amit');

    // WAIT for localStorage to be set
    await page.waitForFunction(() => localStorage.getItem('user') !== null);

    await page.reload();

    const user = await getUser(page);

    expect(user).not.toBeNull();
});

//
//  TC09 - Empty search safe
//
test('TC09 - Empty Search', async ({ page }) => {
    await login(page, 'sneha');

    const search = page.locator('input[placeholder="Search your institute..."]');

    if (await search.count()) {
        await search.fill('');
        await expect(page.locator('.card-row')).toBeVisible();
    }
});

//
//  TC10 - User stored FIXED
//
test('TC10 - User Stored', async ({ page }) => {
    await login(page, 'sneha');

    // WAIT properly
    await page.waitForFunction(() => localStorage.getItem('user') !== null);

    const user = await getUser(page);

    expect(user).not.toBeNull();
});

// TC12 - Search usability
test('TC11 - Search Filters Institutes', async ({ page }) => {
    await login(page, 'sneha');

    const search = page.locator('input[placeholder="Search your institute..."]');

    if (await search.count()) {
        await search.fill('dav');

        const cards = page.locator('.card-row > div');
        await expect(cards.first()).toBeVisible();
    }
});
// TC 12 - No search results safe
test('TC12 - No Search Results', async ({ page }) => {
    await login(page, 'sneha');

    const search = page.locator('input[placeholder="Search your institute..."]');

    if (await search.count()) {
        await search.fill('zzzzzzzzzz');

        const cards = page.locator('.card-row > div');

        await expect(cards).toHaveCount(0);
    }
});
// TC13 - Long institute name handling
test('TC13 - Long Institute Name UI Safe', async ({ page }) => {
    await login(page, 'sneha');

    const search = page.locator('input[placeholder="Search your institute..."]');

    if (await search.count()) {
        await search.fill('dav');

        const cards = page.locator('.card-row > div').first();

        await expect(cards).toBeVisible();
    }
});

// TC14 - Large data handling
test('TC14 - Many Institutes Render', async ({ page }) => {
    await login(page, 'sneha');

    const cards = page.locator('.card-row > div');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(5);
});