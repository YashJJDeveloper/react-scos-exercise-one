// tests/utils/testHelpers.js

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const USERS = {
    alex: { email: 'alex@scos.com', password: 'temp123' },
    raj: { email: 'raj@scos.com', password: 'temp123' },
    priya: { email: 'priya@scos.com', password: 'temp123' },
    amit: { email: 'amit@scos.com', password: 'temp123' },
    sneha: { email: 'sneha@scos.com', password: 'temp123' }
};

// ---------- NAVIGATION ---------- //

async function openLogin(page) {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
}

async function login(page, userKey = 'raj') {
    const user = USERS[userKey];

    await openLogin(page);

    await page.getByPlaceholder('Enter phone or email').fill(user.email);
    await page.getByPlaceholder('Password').fill(user.password);

    await page.getByRole('button', { name: 'Continue' }).click();

    // wait for UI stabilization (not URL)

    await Promise.race([
        page.waitForURL(/InstituteList|roles|dashboard/, { timeout: 5000 }),
        page.waitForSelector('.main-body', { timeout: 5000 }),   // success

        page.waitForSelector('.selected-inst', { timeout: 5000 }), // roles
        page.waitForSelector('.main-container', { timeout: 5000 }), // extra for institute
        page.waitForSelector('.error-message', { timeout: 5000 }) // failure

    ]);
    await page.waitForLoadState('networkidle');
}

// ---------- FORM HELPERS ---------- //

async function fillLogin(page, email, password) {
    await page.getByPlaceholder('Enter phone or email').fill(email);
    await page.getByPlaceholder('Password').fill(password);
}

async function clickContinue(page) {
    await page.getByRole('button', { name: 'Continue' }).click();
}

// ---------- STORAGE HELPERS ---------- //

async function getToken(page) {
    return await page.evaluate(() => localStorage.getItem('token'));
}

async function getUser(page) {
    return await page.evaluate(() =>
        JSON.parse(localStorage.getItem('user'))
    );
}

async function clearStorage(page) {
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
}

// ---------- NAVIGATION SHORTCUTS ---------- //

async function goToInstituteList(page) {
    await page.goto(`${BASE_URL}/InstituteList`);
    await page.waitForLoadState('networkidle');
}

async function goToRoles(page) {
    await page.goto(`${BASE_URL}/roles`);
    await page.waitForLoadState('networkidle');
}

async function goToDashboard(page) {
    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForLoadState('networkidle');
}

// ---------- UI HELPERS ---------- //

async function waitForError(page) {
    const error = page.locator('.error-message');
    await error.waitFor({ state: 'visible' });
    return error;
}

async function toggleTheme(page) {
    const toggle = page.locator('[aria-label="Toggle dark mode"]');

    if (await toggle.count()) {
        await toggle.click();
    }
}

// ---------- EXPORT ---------- //

module.exports = {
    BASE_URL,
    USERS,
    openLogin,
    login,
    fillLogin,
    clickContinue,
    getToken,
    getUser,
    clearStorage,
    goToInstituteList,
    goToRoles,
    goToDashboard,
    waitForError,
    toggleTheme
};