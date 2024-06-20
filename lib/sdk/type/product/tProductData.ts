type TProductData = {

    id                           : string;

    title                        : string;
    description                  : string;

    tags                         : Array<string>;

    options                      : [];
    variants                     : [];
    images                       : [];

    created_at                   : string;
    updated_at                   : string;

    visible                      : boolean;
    is_locked                    : boolean;

    blueprint_id                 : number;

    user_id                      : number,
    shop_id                      : number,
    print_provider_id            : number,

    print_areas                  : [],
    print_details                : [],
    sales_channel_properties     : [],

    is_printify_express_eligible : boolean,
    is_printify_express_enabled  : boolean,
    is_economy_shipping_eligible : boolean,
    is_economy_shipping_enabled  : boolean

}

export default TProductData;
