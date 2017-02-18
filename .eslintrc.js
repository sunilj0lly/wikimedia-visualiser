module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      "no-multi-assign": "off",
      "class-methods-use-this": "warn"
    },
    "globals": {
      "describe": false,
      "beforeEach": false,
      "afterEach": false,
      "inject": false,
      "it": false,
      "expect": false,
      "module": false,
      "angular": false,
      "document": false,
      "window": false,
    }
};