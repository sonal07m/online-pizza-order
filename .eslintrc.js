module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
        "prettier/react"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "settings": {
        "react": {
            "version": require('./package.json').dependencies.react,
        },
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "parser": "babel-eslint",
    "rules": {
        "react/prop-types": 0,
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".js",
                    ".jsx"
                ]
            }
        ],
        "no-console": [
            'error',
            {
                allow: ['warn', 'error', 'info', 'log']
            }
        ],
        "prettier/prettier": [
            "error",
            {
                "trailingComma": "es5",
                "singleQuote": true,
                "printWidth": 100
            }
        ]
    }
};
