module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "@sokkuri/eslint-config",
        "plugin:vue/base",
        "@vue/typescript"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "vue/no-deprecated-data-object-declaration": "error",
        "vue/no-deprecated-destroyed-lifecycle": "error",
        "vue/no-deprecated-dollar-listeners-api": "error",
        "vue/no-deprecated-dollar-scopedslots-api": "error",
        "vue/no-deprecated-events-api": "error",
        "vue/no-deprecated-filter": "error",
        "vue/no-deprecated-html-element-is": "error",
        "vue/no-deprecated-inline-template": "error",
        "vue/no-deprecated-props-default-this": "error",
        "vue/no-deprecated-scope-attribute": "error",
        "vue/no-deprecated-slot-attribute": "error",
        "vue/no-deprecated-slot-scope-attribute": "error",
        "vue/no-deprecated-v-bind-sync": "error",
        "vue/no-deprecated-v-on-native-modifier": "error",
        "vue/no-deprecated-v-on-number-modifiers": "error",
        "vue/no-deprecated-vue-config-keycodes": "error",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    }
};
