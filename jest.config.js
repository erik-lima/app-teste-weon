module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    moduleNameMapper: {
        "axios": "axios/dist/node/axios.cjs",
        "^@/(.*)$": "<rootDir>/src/$1",
        'vuetify/lib(.*)': '<rootDir>/node_modules/vuetify/es5$1'
    }
}
