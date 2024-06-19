# printify.ts
TypeScript/Axios | Unofficial API wrapper for printify.com

## Installation
```bash
npm install printify.ts
```

## Example Usage
```ts
import Printify from 'printify.ts';

const printify = new Printify({ key: 'your api key' });

async function main() : Promise<void> {
    console.log(await printify.getShops());
};

main();
```

# Repository Stats
![Alt](https://repobeats.axiom.co/api/embed/be545157cf383fb614c9fe35fdafdc2fd8febe1c.svg "Repobeats analytics image")