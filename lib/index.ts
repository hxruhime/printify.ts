// docs: https://developers.printify.com
import axios            from "axios";

import IOptions         from "@interface/iOptions";

import TProductVariant  from "@type/product/tProductVariant";
import TProductLinks    from "@type/product/tProductLinks";
import TProductData     from "@type/product/tProductData";
import TProducts        from "@type/product/tProducts";

// V1 WRAPPER CLASS
class Printify {

    key   : string;
    axios : any;

    constructor(options: IOptions) {
        this.key = options.key;

        this.axios = axios.create({
            baseURL: "https://api.printify.com/",
            headers: {
                'Authorization': `Bearer ${this.key}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
    }

    async request(method: string, url: string, data?: any): Promise<any> {
        try {
            const response = await this.axios.request({
                method,
                url,
                data,

            });

            return response.data;
        } catch (error: any) {

            switch (error.response.status) {
                case 403:
                    return { data: '[printify.ts] | Unauthorized access, check your options / request parameters?' };
                case 404:
                    return { data: '[printify.ts] | Not found, check your options / request parameters?' };
            }

        }
    }

    ///////////////////////////////////////////////
    // shops
    ///////////////////////////////////////////////

    // Retrieve a list of existing shops in a Printify account
    async getShops(): Promise<any[]> {
        return await this.request("GET", "v1/shops.json");
    }

    // Disconnect a shop from a Printify account
    async deleteShop(shopId: string): Promise<any> {
        return await this.request("DELETE", `v1/shops/${shopId}/connection.json`);
    }

    ///////////////////////////////////////////////
    // catalog
    ///////////////////////////////////////////////

    // Retrieve a list of all available blueprints
    async getBlueprints(): Promise<any[]> {
        return await this.request("GET", "v1/catalog/blueprints.json");
    }

    // Retrieve a specific blueprint
    async getBlueprint(blueprintId: string): Promise<any> {
        return await this.request("GET", `v1/catalog/blueprints/${blueprintId}.json`);
    }

    // Retrieve a list of all print providers that fulfill orders for a specific blueprint
    async getBlueprintProviders(blueprintId: string): Promise<any[]> {
        return await this.request("GET", `v1/catalog/blueprints/${blueprintId}/print_providers.json`);
    }

    // Retrieve a list of all variants of a blueprint from a specific print provider
    async getBlueprintVariants(blueprintId: string, printProviderId: string): Promise<any[]> {
        return await this.request("GET", `v1/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`);
    }

    // Retrieve the shipping information for all variants of a blueprint from a specific print provider
    async getBlueprintShipping(blueprintId: string, printProviderId: string): Promise<any[]> {
        return await this.request("GET", `v1/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/shipping.json`);
    }

    // Retrieve a list of all print providers
    async getPrintProviders(): Promise<any[]> {
        return await this.request("GET", "v1/catalog/print_providers.json");
    }

    // Retrieve a specific print-provider and a list of associated blueprint offerings
    async getPrintProvider(printProviderId: string): Promise<any[]> {
        return await this.request("GET", `v1/catalog/print_providers/${printProviderId}.json`);
    }

    ///////////////////////////////////////////////
    // products
    ///////////////////////////////////////////////

    // Retrieve a list of all products
    async getProducts(shopId: string): Promise<any[]> {
        return await this.request("GET", `v1/shops/${shopId}/products.json`);
    }

    // Retrieve a product
    async getProduct(shopId: string, productId: string): Promise<any> {
        return await this.request("GET", `v1/shops/${shopId}/products/${productId}.json`);
    }

    // Create a new product
    async createProduct(shopId: string, productData: TProductData): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/products.json`, productData);
    }

    // Update a product
    async updateProduct(shopId: string, productId: string, productData: TProductData): Promise<any> {
        return await this.request("PUT", `v1/shops/${shopId}/products/${productId}.json`, productData);
    }

    // Delete a product
    async deleteProduct(shopId: string, productId: string): Promise<any> {
        return await this.request("DELETE", `v1/shops/${shopId}/products/${productId}.json`);
    }

    // Publish a product
    async postProductPublish(shopId: string, productId: string): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/products/${productId}/publish.json`);
    }

    // Set product publish status to succeeded
    async postProductPublishSuccess(shopId: string, productId: string): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/products/${productId}/publishing_succeeded.json`);
    }

    // Set product publish status to failed
    async postProductPublishFailed(shopId: string, productId: string): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/products/${productId}/publishing_failed.json`);
    }

    // Notify that a product has been unpublished
    async postProductUnpublish(shopId: string, productId: string): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/products/${productId}/unpublish.json`);
    }

    ///////////////////////////////////////////////
    // orders
    ///////////////////////////////////////////////

    // Retrieve a list of orders
    async getOrders(shopId: string): Promise<any[]> {
        return await this.request("GET", `v1/shops/${shopId}/orders.json`);
    }

    // Get order details by id
    async getOrder(shopId: string, orderId: string): Promise<any> {
        return await this.request("GET", `v1/shops/${shopId}/orders/${orderId}.json`);
    }

    // Submit an order
    async postOrder(shopId: string, orderData: any): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/orders.json`, orderData);
    }

    // Submit a Printify Express order
    async postOrderExpress(shopId: string, orderData: any): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/orders/express.json`, orderData);
    }

    // Send an existing order to production
    async postOrderSendToProduction(shopId: string, orderId: string): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/orders/${orderId}/send_to_production.json`);
    }

    // Calculate the shipping cost of an order
    async postOrderShippingCost(shopId: string, orderData: any): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/orders/shipping_cost.json`, orderData);
    }

    // Cancel an unpaid order
    async cancelOrder(shopId: string, orderId: string): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/orders/${orderId}/cancel.json`);
    }

    ///////////////////////////////////////////////
    // webhooks
    ///////////////////////////////////////////////

    // Retrieve a list of webhooks
    async getWebhooks(shopId: string): Promise<any[]> {
        return await this.request("GET", `v1/shops/${shopId}/webhooks.json`);
    }

    // Create a new webhook
    async createWebhook(shopId: string, webhookData: any): Promise<any> {
        return await this.request("POST", `v1/shops/${shopId}/webhooks.json`, webhookData);
    }

    // Modify a webhook
    async updateWebhook(shopId: string, webhookId: string, webhookData: any): Promise<any> {
        return await this.request("PUT", `v1/shops/${shopId}/webhooks/${webhookId}.json`, webhookData);
    }

    // Delete a webhook
    async deleteWebhook(shopId: string, webhookId: string): Promise<any> {
        return await this.request("DELETE", `v1/shops/${shopId}/webhooks/${webhookId}.json`);
    }
}

export {
    TProductVariant,
    TProductLinks,
    TProductData,
    TProducts
}

export default Printify;