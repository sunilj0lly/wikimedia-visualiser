Wikimedia Visualiser
====

An experiment in creating a simple Refux/Flux like flow using the Wikimedia
EventSource API.

The app connects to the Wikimedia EventStream and for each update, it shows
the contibuting user and how many contributions they've made since the
app started tracking the EventSteam.

You can click on the contributor to see what they've contributed.

How to run
----

`npm start` - Start the webserver

`npm run build` - Build the project and watch for file changes


How to test
----

`npm run test` - Run tests (requires Chrome to be installed)

`npm run lint` - Run ESLint


Description
----

The structure of this application is based around a Redux/Flux single direction
flow.

The `store` class is responsible for application state management and takes
two parameters, an `actionHandler` function and a `Middleware` class.
The `actionHandler` is responsible for updating the data based on the type of
update that the `store` receives.
The `Middleware` class is responsible for making async calls and then updating
the `store`.

The `App` creates and connects to the `store`, passing a callback which will be
called when the `store` has updated.
The `App` notifies the `store` of view events by calling `update` on the store
with an update type and a payload.
Once the callback is received, the `App` can update the view.
