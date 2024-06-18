// docs: https://developers.printify.com
import axios            from "axios";

import IOptions         from "@interface/iOptions";

import TProductVariant  from "@type/product/tProductVariant";
import TProductData     from "@type/product/tProductData";


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

    // get all shops
    async getShops(): Promise<any[]> {
        return await this.request("GET", "v1/shops.json");
    }

    // disconnect a shop from a printify account
    async deleteShop(id: string): Promise<any> {
        return await this.request("DELETE", `v1/shops/${id}/connection.json`);
    }

    ///////////////////////////////////////////////
    // products
    ///////////////////////////////////////////////

    // get all products from a shop
    async getProducts(shopId: string): Promise<any[]> {
        return await this.request("GET", `v1/shops/${shopId}/products.json`);
    }

    // get a specific product from a shop
    async getProduct(shopId: string, productId: string): Promise<any> {
        return await this.request("GET", `v1/shops/${shopId}/products/${productId}.json`);
    }

}

export {
    TProductVariant,
    TProductData
}

export default Printify;