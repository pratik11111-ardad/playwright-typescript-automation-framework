import { Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly productTitle: Locator;
  readonly productList: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortFilter: Locator;

  constructor(page: Page) {
    this.productTitle = page.locator(".app_logo");
    this.productList = page.locator(".inventory_item");
    this.productNames = page.locator(".inventory_item_name");
    this.productPrices = page.locator(".inventory_item_price");
    this.sortFilter = page.locator("[data-test='product-sort-container']");
  }
}
