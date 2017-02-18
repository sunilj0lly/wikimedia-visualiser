class App {

  constructor() {}

  $onInit() {
    console.log('app init');
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
