'use strict';

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const api = new Map();

const apiPath = './api';

const cacheFile = (name) => {
    const filePath = apiPath + name;
    const key = path.basename(filePath, '.js');
    try {
        const libPath = require.resolve(filePath);
        delete require.cache[libPath];     
    } catch (e) {
        return;
    }
    try {
        const method = require(filePath);
        api.set(key, method);
    } catch (e) {
        api.delete(key);
    }
};

const cacheFolder = (path) => {
    fs.readdir(path, (err, files) => {
        if (err) return;
        files.forEach(cacheFile);
    });
};

const watch = (path) => {
    fs.watch(path, (event, file) => {
        cacheFile(file);
    });
};

cacheFolder(apiPath);
watch(apiPath);

setTimeout(() => {
    console.dir({ api });
}, 1000);

const recieveArgs = async (req) => {
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const data = Buffer.concat(buffers).toString();
    return JSON.parse(data);
};

const httpError = (res, status, message) => {
    res.statusCode = status;
    res.end(`"${message}"`);
};

http.createServer(async (req, res) => {
    const url = req.url === '/' ? 'index.html' : req.url;
    const [first, second] = url.substring(1).split('/');
    if (first === 'api') {
        const method = api.get(second);
        const args = await recieveArgs(req);
        try {
            const result = await method(...args);
            if (!result) {
                httpError(res, 500, 'Server error');
                return;
            }
            res.end(JSON.stringify(result));
        } catch (err) {
            console.dir({ err });
            httpError(res, 500, 'Server error');
        }
    } else {
        httpError(res, 404, 'File is not found');
    }
});