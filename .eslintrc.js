// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'typescript-eslint-parser',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    globals: {
        cloudhub: true,
        XuntongJSBridge: true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html',
        'typescript'
    ],
    // add your custom rules here
    rules: {
        "no-undef": 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-eval": 0,
        "no-new": 0,
        "indent": [2, 4, {
            "SwitchCase": 1
        }],
        "no-unused-vars": 0,
        // allow paren-less arrow functions
        "arrow-parens": 0,
        // allow async-await
        "generator-star-spacing": 0,
        "no-extra-bind": 0,
        "no-trailing-spaces": [2, {
            "skipBlankLines": true
        }],
        "no-useless-escape": 0,
        "no-control-regex": 0
    }
}
