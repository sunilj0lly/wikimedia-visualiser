module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      "no-multi-assign": "off",
      "class-methods-use-this": "warn",
      "no-underscore-dangle": "off",
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
      "EventSource": false,
      "postMessage": false,
      "Worker": false,
    }
};
