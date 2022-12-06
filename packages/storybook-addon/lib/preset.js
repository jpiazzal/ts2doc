const { ts2doc } = require('@ts2doc/json');
const fs = require('fs-extra');
const glob = require('glob');

module.exports = {
    // Use manageEntries because did not found a better place to generate json file
    managerEntries: function managerEntries(entry = [], options) {
        if (options.patternDocType == null) {
            throw new Error('patternDocType is required as an option');
        }

        const filesToParse = glob.sync(options.patternDocType);
        const doc = ts2doc(filesToParse, options.compilerOptions);
        fs.ensureDirSync('node_modules/.cache/ts2doc');
        fs.writeJsonSync('node_modules/.cache/ts2doc/doc.json', doc);

        return entry;
    }
};
