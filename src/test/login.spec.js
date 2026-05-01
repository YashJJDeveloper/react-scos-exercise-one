require('dotenv').config();
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const EMAIL = process.env.LOGIN_EMAIL || 'sneha@scos.com';
const PASSWORD = process.env.LOGIN_PASSWORD || 'temp123';

test.setTimeout(60000);

// ---------- HELPERS ---------- //

async function openLogin(page) {
    await page.goto(BASE_URL);
    await expect(page.getByPlaceholder('Enter phone or email')).toBeVisible();
}

async function fillLogin(page, email, password) {
    await page.getByPlaceholder('Enter phone or email').fill(email);
    await page.getByPlaceholder('Password').fill(password);
}

async function clickContinue(page) {
    await page.getByRole('button', { name: 'Continue' }).click();
}










// ---------- TESTS ---------- //

//  Page loads correctly
test('TC01 - Page Load', async ({ page }) => {
    await openLogin(page);

    await expect(
        page.getByRole('heading', { name: 'MentrixOS' })
    ).toBeVisible();

    await expect(
        page.getByRole('button', { name: 'Continue' })
    ).toBeVisible();
});

//  Input typing works
test('TC02 - Input Typing', async ({ page }) => {
    await openLogin(page);

    const emailInput = page.getByPlaceholder('Enter phone or email');
    await emailInput.type('abc');

    await expect(emailInput).toHaveValue('abc');
});

//  Clear input
test('TC03 - Clear Input', async ({ page }) => {
    await openLogin(page);

    const input = page.getByPlaceholder('Enter phone or email');
    await input.fill('test');
    await input.fill('');

    await expect(input).toHaveValue('');
});

//  Empty fields validation
test('TC04 - Empty Fields', async ({ page }) => {
    await openLogin(page);

    await clickContinue(page);

    await expect(page.locator('.error-message')).toHaveText(/required/i);
});

//  Only email entered
test('TC05 - Only Email', async ({ page }) => {
    await openLogin(page);

    await fillLogin(page, EMAIL, '');
    await clickContinue(page);

    await expect(page.locator('.error-message')).toBeVisible();
});

//  Only password entered
test('TC06 - Only Password', async ({ page }) => {
    await openLogin(page);

    await fillLogin(page, '', PASSWORD);
    await clickContinue(page);

    await expect(page.locator('.error-message')).toBeVisible();
});

//  Invalid credentials 
test.only('TC07 - Invalid Login', async ({ page }) => {
    await openLogin(page);

    await fillLogin(page, 'wrong@mail.com', 'wrong123');
    await clickContinue(page);

    const error = page.locator('.error-message');

    await expect(error).toBeVisible();

    //  flexible assertion (not exact match)
    await expect(error).toContainText(/invalid|user not found|wrong/i);
});
//  Valid login 
test('TC08 - Valid Login', async ({ page }) => {
    await openLogin(page);

    await fillLogin(page, EMAIL, PASSWORD);
    await clickContinue(page);

    await expect(page).toHaveURL(/dashboard|InstituteList|roles/);
});
//  Loader appears on click
test('TC09 - Loader State', async ({ page }) => {
    await openLogin(page);

    await fillLogin(page, EMAIL, PASSWORD);

    const button = page.getByRole('button', { name: 'Continue' });

    await clickContinue(page);

    // check immediately after click
    await expect(button).toBeDisabled();
});

//  Error disappears after correct login (FIXED)
test('TC10 - Error Removal', async ({ page }) => {
    await openLogin(page);

    //  First attempt (invalid)
    await fillLogin(page, 'wrong@mail.com', 'wrong123');
    await clickContinue(page);

    const error = page.locator('.error-message');
    await expect(error).toBeVisible();

    //  Second attempt (valid)
    await fillLogin(page, EMAIL, PASSWORD);
    await clickContinue(page);


    await expect(page).toHaveURL(/dashboard|InstituteList|roles/);


    await expect(page.locator('.error-message')).not.toBeVisible();
});
//  Token stored in localStorage (FIXED)
test('TC11 - Token Storage', async ({ page }) => {
    await openLogin(page);

    await fillLogin(page, EMAIL, PASSWORD);
    await clickContinue(page);
    await expect(page).toHaveURL(/dashboard|InstituteList|roles/);


    const token = await page.evaluate(() => localStorage.getItem('token'));

    expect(token).toBeTruthy();
    expect(token.length).toBeGreaterThan(10); // don’t check exact value
});

//  Input accepts paste (fill)
test('TC12 - Copy Paste', async ({ page }) => {
    await openLogin(page);

    const input = page.getByPlaceholder('Enter phone or email');
    await input.fill(EMAIL);

    await expect(input).toHaveValue(EMAIL);
});

//  Theme toggle (safe)
test('TC13 - Theme Toggle', async ({ page }) => {
    await openLogin(page);

    const toggle = page.locator('[aria-label="Toggle dark mode"]');

    if (await toggle.count()) {
        const before = await page.evaluate(() => document.body.className);

        await toggle.click();

        const after = await page.evaluate(() => document.body.className);
        expect(after).not.toBe(before);
    }
});