import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import HeroesCard from '../HeroesCard/HeroesCard';
import Spiner from '../Spiner/Spiner';

import style from './HeroList.module.scss';

class HeroList extends Component {
  constructor(props) {
    super(props)
    this.MarvelService = new MarvelService();
    this.state = {
      offset: 210,
      heroList: [],
      newHeroLoad: false,
    }
    this.onScrollWindow = this.onScroll.bind(this);
  }

  addHeroesToList = async () => {
    const {offset, newHeroLoad} = this.state,
        windowElem = document.documentElement || document.body;

    if(newHeroLoad) return;

    const limit = windowElem.clientWidth <= 1200 ? 12 : 9;

    this.setState({newHeroLoad: true});

    const heroList = await this.MarvelService.getAllCharacter({limit, offset});

    this.setState(state =>{
      
      return (
        {
          offset: state.offset === 0 ? 0 : state.offset + limit,
          heroList: [...state.heroList, ...heroList.data.results],
          newHeroLoad: false,
        }
      );
    })
  }

  onClick = (idHero) => {
    this.props.changeSelectHero(idHero);
  }

  onScroll = () => {
    const element = document.documentElement || document.body;

    const viewHeight = element.clientHeight,
          scrollHeight = element.scrollTop,
          allHeight = element.scrollHeight;

    const heroesListIsEmpty = document.querySelectorAll('ul[class^="HeroList_heroes"] li').length === 0;
    
    if (viewHeight + scrollHeight === allHeight && !heroesListIsEmpty) {
        this.addHeroesToList();

    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScrollWindow); 
    this.addHeroesToList();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollWindow);
  }

  render() {
    const {heroList, newHeroLoad} = this.state;

    const spiner = newHeroLoad ? <Spiner /> : null;
    
    const heroes = heroList.map( ({id, name, thumbnail}) => {
      const pathImg = thumbnail.path + "." + thumbnail.extension;
      return <HeroesCard name={name}
                        id={id}
                        imgPath={pathImg}
                        key={id}
                        onClick={this.onClick}/>
    });


    return (
      <div className={style.wrapHeroes}>
        <ul className={style.heroes}>
          {heroes}
        </ul>
        <div className={style.loader}>
          {spiner}
        </div>
        
      </div>
    );
  }
}

export default HeroList;