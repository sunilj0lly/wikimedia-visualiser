import 'normalize-css';
import angular from 'angular';

import './app.css';
import App from './App.container';

angular
    .module('app', [])
    .component('app', App);
