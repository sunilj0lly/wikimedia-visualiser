import Store from './store/Store';
import WikimediaEventStream from './store/WikimediaEventStream';
import { START_STREAM } from './store/Actions';

class App {

  constructor() {
    this.store = new Store(WikimediaEventStream);
  }

  $onInit() {
    this.store.connect(this.onStoreUpdate);
    this.store.action(START_STREAM);
  }

  onStoreUpdate(data) {
    console.log(data);
  }

}

const AppConfig = {

  template: `
    <section>
      <h1>Wikimedia Visualiser</h1>
    </section>
  `,
  bindings: {},
  controller: App,
};

export default AppConfig;
