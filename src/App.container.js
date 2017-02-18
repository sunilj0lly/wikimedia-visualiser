import Store from './store/Store';
import WikimediaEventStream from './store/WikimediaEventStream';
import * as Actions from './store/Actions';

class App {

  constructor($timeout) {
    this.$timeout = $timeout;
    this.store = new Store(WikimediaEventStream);
  }

  $onInit() {
    this.store.connect(this.onStoreUpdate.bind(this));
  }

  onStoreUpdate(data) {
    this.$timeout(() => {
      this.data = data;
    });
  }

  onStartStreamClick() {
    this.store.action(Actions.START_STREAM);
  }

  onStopStreamClick() {
    this.store.action(Actions.STOP_STREAM);
  }

}

const AppConfig = {

  template: `
    <section>
      <h1>Wikimedia Visualiser</h1>
      <a href='#' ng-if="!$ctrl.data.isStreaming" ng-click="$ctrl.onStartStreamClick($event)">Start Stream</a>
      <a href='#' ng-if="$ctrl.data.isStreaming" ng-click="$ctrl.onStopStreamClick($event)">Stop Stream</a>
      <section>
        <div ng-repeat="event in $ctrl.data.events">
          {{event.user}} - {{event.bot}} - {{event.uri}}
        </div>
    </section>
  `,
  bindings: {},
  controller: App,
};

export default AppConfig;
