import { Page } from "@playwright/test";

export class LoginPage {

    usernameInput;
    passwordInput;
    loginButton;
    errorMessage;

    constructor(private page: Page) {
        this.usernameInput = this.page.getByPlaceholder("Username");
        this.passwordInput = this.page.getByPlaceholder("Password");
        this.loginButton = this.page.getByRole("button", {
            name: "Login"
        });
        this.errorMessage = this.page.getByText(
            "Epic sadface: Username and password do not match any user in this service"
        );
    }


    async openLoginPage() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLogin();
    }
}