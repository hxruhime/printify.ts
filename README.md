# printify.ts
![NPM Version](https://img.shields.io/npm/v/printify.ts) ![License](https://img.shields.io/npm/l/printify.ts)

Unofficial [Printify API](https://developers.printify.com) wrapper written in TypeScript using [axios](https://axios-http.com).

Please note some types are still in the process of being added.

## Installation
```bash
npm install printify.ts
```

## Example Usage
```ts
import Printify from 'printify.ts';

const printify = new Printify({ key: 'your api key' });

async function main(): Promise<void> {
    console.log(await printify.getShops());
};

main();
```

# Interfaces
#### Interfaces may be found in `lib/sdk/interface/` aliased as `@interface/`

### API Options
```ts
interface IOptions {
    key: string; // API key
}
```

# Methods
#### Types for each response may be found in `lib/sdk/type/` aliased as `@type/`

### Shops
```ts
// Retrieve a list of existing shops in a Printify account
await printify.getShops(): Promise<any[]>;

// Disconnect a shop from a Printify account
await printify.deleteShop(shopId: string): Promise<any>;
```

### Catalog
```ts
// Retrieve a list of all available blueprints
await printify.getBlueprints(): Promise<any[]>;

// Retrieve a specific blueprint
await printify.getBlueprint(blueprintId: string): Promise<any>;

// Retrieve a list of all print providers that fulfill orders for a specific blueprint
await printify.getBlueprintProviders(blueprintId: string): Promise<any[]>;

// Retrieve a list of all variants of a blueprint from a specific print provider
await printify.getBlueprintVariants(blueprintId: string, printProviderId: string): Promise<any[]>;

// Retrieve the shipping information for all variants of a blueprint from a specific print provider
await printify.getBlueprintShipping(blueprintId: string, printProviderId: string): Promise<any[]>;

// Retrieve a list of all print providers
await printify.getPrintProviders(): Promise<any[]>;

// Retrieve a specific print-provider and a list of associated blueprint offerings
await printify.getPrintProvider(printProviderId: string): Promise<any>;
```

### Products
```ts
// Retrieve a list of all products
await printify.getProducts(shopId: string): Promise<any[]>;

// Retrieve a product
await printify.getProduct(shopId: string, productId: string): Promise<any>;

// Create a new product
await printify.createProduct(shopId: string, productData: TProductData): Promise<any>;

// Update a product
await printify.updateProduct(shopId: string, productId: string, productData: TProductData): Promise<any>;

// Delete a product
await printify.deleteProduct(shopId: string, productId: string): Promise<any>;

// Publish a product
await printify.postProductPublish(shopId: string, productId: string): Promise<any>;

// Set product publish status to succeeded
await printify.postProductPublishSuccess(shopId: string, productId: string): Promise<any>;

// Set product publish status to failed
await printify.postProductPublishFailed(shopId: string, productId: string): Promise<any>;

// Notify that a product has been unpublished
await printify.postProductUnpublish(shopId: string, productId: string): Promise<any>;
```

### Orders
```ts
// Retrieve a list of orders
await printify.getOrders(shopId: string): Promise<any[]>;

// Get order details by id
await printify.getOrder(shopId: string, orderId: string): Promise<any>;

// Submit an order
await printify.postOrder(shopId: string, orderData: any): Promise<any>;

// Submit a Printify Express order
await printify.postOrderExpress(shopId: string, orderData: any): Promise<any>;

// Send an existing order to production
await printify.postOrderSendToProduction(shopId: string, orderId: string): Promise<any>;

// Calculate the shipping cost of an order
await printify.postOrderShippingCost(shopId: string, orderData: any): Promise<any>;

// Cancel an unpaid order
await printify.cancelOrder(shopId: string, orderId: string): Promise<any>;
```

### Webhooks
```ts
// Retrieve a list of webhooks
await printify.getWebhooks(shopId: string): Promise<any[]>;

// Create a new webhook
await printify.createWebhook(shopId: string, webhookData: any): Promise<any>;

// Modify a webhook
await printify.updateWebhook(shopId: string, webhookId: string, webhookData: any): Promise<any>;

// Delete a webhook
await printify.deleteWebhook(shopId: string, webhookId: string): Promise<any>;
```

# Repository Stats
![Alt](https://repobeats.axiom.co/api/embed/be545157cf383fb614c9fe35fdafdc2fd8febe1c.svg "Repobeats analytics image")

---
