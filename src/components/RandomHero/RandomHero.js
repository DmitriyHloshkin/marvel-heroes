import { Component, Fragment } from 'react';
import MarvelService from '../../services/MarvelService';

import Btn from '../Btn/Btn';
import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';

import style from './RandomHero.module.scss';

class RandomHero extends Component {
  constructor(prop) {
    super(prop);

    this.MarvelService = new MarvelService();
    this.state = {
      idCollect: null,
      error: false,
      loaded: true,
      hero: {
        name: null,
        reduceDescr: null,
        thumbnail: null,
        wiki: null,
        homepage: null,
      }
    };

    this.updateHero();
  }

  onChangeHero = () => this.updateHero();

  updateHero = async () => {
    let { idCollect } = this.state;

    const getRandomHero = (collect) => idCollect[Math.floor(Math.random() * (idCollect.length - 1))];
  
    try {
      this.setState({loaded: true});

      if (!idCollect) {
        idCollect = await this.MarvelService.getAllIdHero();
        this.setState({idCollect});
      }
      
      const dataHero = await this.MarvelService.getCharacterById(getRandomHero(idCollect));

      this.setState({
        hero: dataHero,
        loaded: false,
      });

    } catch (error) {
      this.setState({
        error: true,
        loaded: false,
      });
    }

  }

  render() {
    const {hero, loaded, error} = this.state;
    
    return (
      <section className={style.randomHero}>
        <HeroCard hero={hero} loaded={loaded} error={error}/>

        <div className={style.randomSection}>
            <h2>Random character for today! <br />Do you want to get to know him better?</h2>
            <span>Or choose another one</span>
            <Btn action='tryIt' 
                onClick={this.onChangeHero}/>
        </div>
      </section>
    );
  }
}

const HeroCard = ({hero, loaded, error}) => {
  const {thumbnail, name, reduceDescr, wiki, homepage} = hero;
  let content;

  if (error && !loaded) {
    content = <Error />;
  }

  if (loaded  && !error) {
    content = <Spiner /> ;
  } 
  
  if (!loaded && !error){
    content = (
      <Fragment>
        <div className={style.imageHero}>
          <img src={thumbnail} alt={`hero ${name}`} />
        </div>

        <div className={style.aboutHero}>
          <h2 className={style.name}>{name}</h2>
          <p className={style.descr}>
            {reduceDescr}
          </p>
          <div className={style.btns}>
            <Btn action='homepage' 
                  url={homepage} />

            <Btn action='wiki' 
                  url={wiki} />
          </div>
        </div>
      </Fragment>
    );
  }
  
  return (
    <div className={style.aboutSection}>
      {content}
    </div>
  );
}

export default RandomHero;