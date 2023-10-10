import { SchemaFieldTypes, createClient } from 'redis';

const goodsSchema = {
    'vendor': '',
    'articul': '',
    'date': '',
    'price': 0,
    'quantity': 0,
};

const pushToBase = async () => {
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

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

await client.connect();