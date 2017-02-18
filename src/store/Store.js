// kludge: Should have error handling where dependencies don't exist
class Store {

  constructor(Middleware, actionHandler) {
    // kludge: Should accept array of middlewares
    this.middleware = new Middleware(this.action.bind(this));
    this.actionHandler = actionHandler;
    this.data = {
      isStreaming: false,
    };
  }

  connect(callback) {
    // kludge: Should accept array of callbacks
    this.callback = callback;
    this.callback(this.actionHandler(this.data));
  }

  action(type, payload) {
    this.middleware.action(type, payload);
    this.callback(this.actionHandler(this.data, type, payload));
  }
}

export default Store;
