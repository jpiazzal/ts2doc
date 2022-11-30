const { getDocFromFiles } = require('../dist');

const arguments = process.argv.slice(2);

const doc = getDocFromFiles(arguments);

console.info(doc);
