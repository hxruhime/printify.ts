type TProductVariant = {

    id                           : number;

    sku                          : string;

    cost                         : number;
    price                        : number;

    title                        : string;

    grams                        : number;

    is_enabled                   : boolean;
    is_default                   : boolean;
    is_printify_express_eligible : boolean;

    options                      : number[];

    quantity                     : number;
}

export default TProductVariant;
