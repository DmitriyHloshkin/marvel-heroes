import { Component } from "react";

import style from './App.module.scss';

import Container from "../Container/Container";
import RandomHero from "../RandomHero/RandomHero";
import HeroList from "../HeroList/HeroList";
import HeroDescr from "../HeroeDescr/HeroDescr";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectHeroId: null,
    }
  }

  changeSelectHero = (selectHeroId) => {
    this.setState({selectHeroId})
  }

  render() {
    const {selectHeroId} = this.state;

    return (
        <main>
          <Container>
            <RandomHero />
            <section className={style.heroes}>
              <HeroList changeSelectHero={this.changeSelectHero}/>
              <ErrorBoundary>
                <HeroDescr selectHeroId={selectHeroId}/>
              </ErrorBoundary>
              
            </section>
          </Container>
        </main>      
    );
  }
}

export default App;
