class Store {

  constructor(Middleware, actionHandler) {
    // kludge: should accept array of middlewares
    this.middleware = new Middleware(this.action.bind(this));
    this.actionHandler = actionHandler;
    this.data = {
      isStreaming: false,
    };
  }

  connect(callback) {
    // kludge: shold accept array of callbacks
    this.callback = callback;
    this.callback(this.actionHandler(this.data));
  }

  action(type, payload) {
    this.middleware.action(type, payload);
    this.callback(this.actionHandler(this.data, type, payload));
  }
}

export default Store;
