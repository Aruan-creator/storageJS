import { SchemaFieldTypes, createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

const articul = 'testArticul'; //need to fetch


const testItem = {
    'vendor': 'GM',
    'date': '10.10.2023',
    'price': 9000,
    'quantity': 3,
};

const createSchema = async () => {
    try {
        await client.ft.create('idx:articuls', {
            '$.vendor': {
                type: SchemaFieldTypes.TEXT,
            },
            '$.date': {
                type: SchemaFieldTypes.TEXT,
                SORTABLE: true
            },
            '$.price': {
                type: SchemaFieldTypes.NUMERIC,
                AS: 'price',
            },
            '$quantity': {
                type: SchemaFieldTypes.NUMERIC,
                AS: 'quant',
            },
        }, {
            ON: 'JSON',
            PREFIX: 'articuls',
        });
    } catch (e) {
        if (e.message === 'Index already exists') {
            console.log('Index exists already, skipped creation.');
        } else {
            console.log(e);
            process.exit(1);
        }
    }
};

const pushToBase = async (articul, object) => {
    try {
        await client.json.set(articul, '$', object); 
    } catch(e) {
        console.log(e);
    }
};
//to do: add main func for test 
await client.connect();