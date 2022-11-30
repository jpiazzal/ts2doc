#!/usr/bin/env node

const ts2doc = require('../dist');

const arguments = process.argv.slice(2);

const doc = ts2doc.default(arguments);

console.info(doc);
