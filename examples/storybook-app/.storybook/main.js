module.exports = {
    stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(json)'],
    addons: [
        '@storybook/addon-docs',
        {
            name: '@ts2doc/storybook-addon',
            options: {
                patternDocType: 'src/**/*.ts'
            }
        }
    ]
};
