import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";


test("Login with valid Credientials",async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);

});

test("login with invalid Credientials",async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login("standard_user", "wrong_password");
    await expect(loginPage.errorMessage).toBeVisible();

});

test(" Verify logout functionality ",async ({page})=> {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator("//a[@id='logout_sidebar_link']").click();
    await expect(loginPage.usernameInput).toBeVisible();


} 
);
