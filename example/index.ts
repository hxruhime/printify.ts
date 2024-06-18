import * as dotenv               from 'dotenv';
dotenv.config();

import Printify                  from "../lib";

import IOptions                  from "@interface/iOptions";

const options: IOptions = {
    key : process.env.PRINTIFY_API_KEY as string,
}

const printify = new Printify(options);

const main = async () => {

    console.log("running tests:")
    console.log("=================================")

    // shops
    console.log(await printify.getShops());

    // products
    console.log(await printify.getProducts(''))

    console.log("=================================")
}

main().then(r => console.log("tests complete"));