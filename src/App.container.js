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
        <div ng-repeat="user in $ctrl.data.users | orderBy: '-numberOfContributions'">
          {{user.name}} - {{user.numberOfContributions}}
            contribution<span ng-if="user.numberOfContributions > 1">s</span>
        </div>
    </section>
  `,
  bindings: {},
  controller: App,
};

export default AppConfig;
