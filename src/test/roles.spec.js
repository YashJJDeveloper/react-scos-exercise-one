const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

// ---------- HELPERS ---------- //

async function login(page, email, password) {
    await page.goto(BASE_URL);

    await page.getByPlaceholder('Enter phone or email').fill(email);
    await page.getByPlaceholder('Password').fill(password);

    await Promise.all([
        page.waitForURL(/InstituteList|roles/),
        page.getByRole('button', { name: 'Continue' }).click()
    ]);
}

async function goToRoles(page) {
    // click first institute → go to roles
    const firstInstitute = page.locator('.card-row div').first();

    await Promise.all([
        page.waitForURL(/roles|dashboard/),
        firstInstitute.click()
    ]);
}

// ---------- TESTS ---------- //

//  TC01 - Roles page loads
test('TC01 - Roles Page Load', async ({ page }) => {
    await login(page, 'sneha@scos.com', 'temp123');
    await goToRoles(page);

    await expect(page.locator('.main-body')).toBeVisible();
});

//  TC02 - Header visible
test('TC02 - Header Visible', async ({ page }) => {
    await login(page, 'sneha@scos.com', 'temp123');
    await goToRoles(page);

    await expect(
        page.getByRole('heading', { name: 'Select Your Role' })
    ).toBeVisible();
});

//  TC03 - Roles displayed
test('TC03 - Roles Render', async ({ page }) => {
    await login(page, 'sneha@scos.com', 'temp123');
    await goToRoles(page);

    const roles = page.locator('.card-row div');

    await expect(roles.first()).toBeVisible();
    expect(await roles.count()).toBeGreaterThan(0);
});

//  TC04 - Role click → dashboard
test('TC04 - Role Click Navigation', async ({ page }) => {
    await login(page, 'sneha@scos.com', 'temp123');
    await goToRoles(page);

    const firstRole = page.locator('.card-row div').first();

    await Promise.all([
        page.waitForURL(/dashboard/),
        firstRole.click()
    ]);

    await expect(page).toHaveURL(/dashboard/);
});

//  TC05 - Back button → InstituteList
test('TC05 - Back to Institute List', async ({ page }) => {
    await login(page, 'sneha@scos.com', 'temp123');
    await goToRoles(page);

    await page.getByText('Change Institute').click();

    await expect(page).toHaveURL(/InstituteList/);
});

//  TC06 - Single role auto redirect
test('TC06 - Single Role Redirect', async ({ page }) => {
    // Use a user who has single role
    await login(page, 'amit@scos.com', 'temp123');

    await goToRoles(page);

    // Should directly go to dashboard
    await expect(page).toHaveURL(/dashboard/);
});

//  TC07 - Direct access without state

test('TC07 - Direct Roles Access Redirect', async ({ page }) => {
    await page.goto('http://localhost:3000/roles');


    await expect(page).toHaveURL(/\/$/);
});


//  TC08 - Institute card visible
test('TC08 - Selected Institute Visible', async ({ page }) => {
    await login(page, 'sneha@scos.com', 'temp123');
    await goToRoles(page);

    await expect(page.locator('.selected-inst')).toBeVisible();
});

//  TC09 - Role cards clickable
test('TC09 - Role Cards Clickable', async ({ page }) => {
    await login(page, 'sneha@scos.com', 'temp123');
    await goToRoles(page);

    const role = page.locator('.card-row div').first();

    await expect(role).toBeVisible();
    await role.click();
});

//  TC10 - Refresh keeps role page (if state exists)
test('TC10 - Refresh Behavior', async ({ page }) => {
    await login(page, 'sneha@scos.com', 'temp123');
    await goToRoles(page);

    await page.reload();

    const url = page.url();

    expect(
        url.includes('/roles') ||
        url.includes('/InstituteList') ||
        url.endsWith('/\/$/')
    ).toBeTruthy();
});
// TC11 - Direct role access blocked
test('TC11 - Direct Roles Access Blocked', async ({ page }) => {
    await page.goto('http://localhost:3000/roles');

    await expect(page).toHaveURL(/InstituteList|\/$/);
});

// TC12 - Single institute multi-role
test('TC12 - Multi Role User', async ({ page }) => {
    await login(page, 'priya@scos.com', 'temp123');

    const roles = page.locator('.card-row > div');

    await expect(roles.first()).toBeVisible();
    expect(await roles.count()).toBeGreaterThan(1);
});

// TC13 - Button response
test('TC13 - Role Click Responsive', async ({ page }) => {
    await login(page, 'sneha@scos.com', 'temp123');

    const role = page.locator('.card-row > div').first();

    await role.click();

    await expect(page.locator('.main-container')).toBeVisible();
});