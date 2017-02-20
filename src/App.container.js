import _ from 'lodash';
import Store from './store';
import WikimediaEventStream from './store/WikimediaEventStream';
import * as Actions from './store/Actions';
import actionHandler from './store/ActionHandler';

class App {

  constructor($timeout) {
    this.$timeout = $timeout;
    this.store = new Store(WikimediaEventStream, actionHandler);
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

  onShowContributionsClick(user) {
    this.contributionList = _.filter(this.data.uris, uri => uri.user === user);
  }

}

const AppConfig = {

  template: `
    <section>
      <h1>Wikimedia Visualiser</h1>
      <a href='#' ng-if="!$ctrl.data.isStreaming" ng-click="$ctrl.onStartStreamClick($event)">Start Stream</a>
      <a href='#' ng-if="$ctrl.data.isStreaming" ng-click="$ctrl.onStopStreamClick($event)">Stop Stream</a>
    </section>

    <section class="TwoColumnLayout">
      <section class="TwoColumnLayout__expand" ng-if="$ctrl.data.users">
        <h2>Recent contributors</h2>
        <div ng-repeat="user in $ctrl.data.users | orderBy: '-numberOfContributions'">
          {{user.name}} - <a href="#" ng-click="$ctrl.onShowContributionsClick(user.name)">{{user.numberOfContributions}}
            contribution<span ng-if="user.numberOfContributions > 1">s</span></a>
        </div>
      </section>

      <section ng-if="$ctrl.contributionList">
        <h2>Contributions by {{$ctrl.contributionList[0].user}}</h2>
        <ol>
          <li ng-repeat="item in $ctrl.contributionList">
            <a ng-href="{{item.uri}}" target="_blank">{{item.uriShort}}</a>
          </li>
        </ol>
      </section>
    </section>
  `,
  bindings: {},
  controller: App,
};

export default AppConfig;
