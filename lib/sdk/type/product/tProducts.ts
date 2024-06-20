
import TProductData  from "@type/product/tProductData";
import TProductLinks from "@type/product/tProductLinks";

type TProduct = {

    current_page   : number,

    data           : TProductData[],

    first_page_url : string,

    from           : number,
    last_page      : number,

    last_page_url  : string,

    links          : TProductLinks[],

    next_page_url  : string,
    path           : string,

    per_page       : number,

    prev_page_url  : string,

    to             : number,
    total          : number

}

export default TProduct;
