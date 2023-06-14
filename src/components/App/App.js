import { Component, Fragment } from "react";

import Container from "../Container/Container";
import RandomHero from "../RandomHero/RandomHero";

class App extends Component {

  render() {
    return (
      <Fragment>
        <main>
          <Container>
            <RandomHero />
          </Container>
        </main>      
      </Fragment>
    );
  }
}

export default App;
