import Store from './store/Store';
import WikimediaEventStream from './store/WikimediaEventStream';
import * as Actions from './store/Actions';

class App {

  constructor() {
    this.store = new Store(WikimediaEventStream);
  }

  $onInit() {
    this.store.connect(this.onStoreUpdate);
  }

  onStoreUpdate(data) {
    console.log(data);
  }

  onStartStreamClick() {
    console.log('onclick');
    this.store.action(Actions.START_STREAM);
  }

  onStopStreamClick() {
    console.log('onclick');
    this.store.action(Actions.STOP_STREAM);
  }

}

const AppConfig = {

  template: `
    <section>
      <h1>Wikimedia Visualiser</h1>
      <a href='#' ng-click="$ctrl.onStartStreamClick($event)">Start Stream</a>
      <a href='#' ng-click="$ctrl.onStopStreamClick($event)">Stop Stream</a>
    </section>
  `,
  bindings: {},
  controller: App,
};

export default AppConfig;
