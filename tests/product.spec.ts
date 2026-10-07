
import { test, expect } from "../fixtures/fixtures";

test.describe("Product tests", { tag: "@regression" }, () => {
  test("Verify all products are displayed on the products page", async ({ loginPage, productPage }) => {
    await loginPage.openLoginPage();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(productPage.productList).not.toHaveCount(0);
  });

  test("Verify products page loads successfully", async ({ loginPage, productPage }) => {
    await loginPage.openLoginPage();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(productPage.productTitle).toBeVisible();
    await expect(productPage.productTitle).toHaveText("Swag Labs");
  });

  test("Verify product sorting by Name (A → Z)", async ({ loginPage, productPage }) => {
    await loginPage.openLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
    await productPage.sortFilter.selectOption("az");

    const productNames = await productPage.productNames.allTextContents();
    expect(productNames).toEqual([...productNames].sort((a, b) => a.localeCompare(b)));
  });

  test("Verify product sorting by Name (Z → A)", async ({ loginPage, productPage }) => {
    await loginPage.openLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
    await productPage.sortFilter.selectOption("za");

    const productNames = await productPage.productNames.allTextContents();
    expect(productNames).toEqual([...productNames].sort((a, b) => b.localeCompare(a)));
  });

  test("Verify product sorting by Price (low → high)", async ({ loginPage, productPage }) => {
    await loginPage.openLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
    await productPage.sortFilter.selectOption("lohi");

    const productPrices = await productPage.productPrices.allTextContents();
    const numericPrices = productPrices.map(price => parseFloat(price.replace("$", "")));
    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
  });

  test("Verify product sorting by Price (high → low)", async ({ loginPage, productPage }) => {
        await loginPage.openLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
    await productPage.sortFilter.selectOption("hilo");

    const productPrices = await productPage.productPrices.allTextContents();
    const numericPrices = productPrices.map(price => parseFloat(price.replace("$", "")));
    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => b - a));
  });
});