module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb",
        "plugin:react/recommended"
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
    "plugins": [
        "react"
    ],
    "rules": {
        "react/destructuring-assignment": [1, "always"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-props-no-spreading": [0, {
            "html": "ignore" | "enforce",
            "custom": "ignore" | "enforce",
            "explicitSpread": "ignore" | "enforce",
            "exceptions": ["jsx-props-no-spreading"]
            }]
    },
    "parser": "babel-eslint"
};