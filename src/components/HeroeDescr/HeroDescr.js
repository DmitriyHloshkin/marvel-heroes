import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Error from '../Error/Error';
import Spiner from '../Spiner/Spiner';
import Btn from '../Btn/Btn';
import ComicsListItem from '../ComocsListItem/ComicsListItem';

import MarvelService from '../../services/MarvelService';

import style from './HeroDescr.module.scss';

class HeroDescr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marvelService: new MarvelService(),
      loading: false,
      error: false,
      dataHero: {
        name: null,
        id: null,
        descr: null,
        homepage: null,
        path: null,
        wiki: null,
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {selectHeroId} = this.props,
          {marvelService} = this.state;
    
    const changeHeroDescr = async () => {
      try {
        this.setState({loading: true});
        const dataHero = await marvelService.getCharacterById(selectHeroId);
        const {name, descr, homepage, thumbnail, wiki, comics} = dataHero;
        this.setState({
          loading: false,
          dataHero: {
            name,
            descr,
            homepage,
            path: thumbnail,
            wiki,
            comics,
            }
          })
      } catch (error) {
        this.setState({
          loading: false,
          error: true,
        })
      }

    };

    if (prevProps.selectHeroId !== selectHeroId) {
      changeHeroDescr();
    }


  }
  
  render() {
    const  {error, loading, dataHero : {name}} = this.state;
    
    if(!name && !error && !loading) {
      return <EmptyHero />;
    }

    if (loading) {
      return <Spiner />;
    }

    if (error) {
      return <Error />;
    }

    return <FillHero {...this.state.dataHero}/>

  }
}

const EmptyHero = () => {
  return (
    <div className={style.wrapperEmpty}>
      <h2>Please select a character to see information</h2>

      <div className={style.firstLine}>
        <div className={style.circle}></div>
        <div className={style.line}></div>
      </div>

      <div className={style.line}></div>
      <div className={style.line}></div>
      <div className={style.line}></div>
    </div>
  );
};

const FillHero = (props) => {
  const {name, path, homepage, wiki, comics, descr} = props;
  
  const comicsItems = comics.map(({name, resourceURI}) => {
    return <ComicsListItem title={name} 
                            url={resourceURI} 
                            key={uuidv4()}/>
  }).slice(0, 9);

  return (
    <div className={style.wrapperFill}>
      <header className={style.mainInfo}>
        <div className={style.imgHero}>
          <img src={path} alt={name} />
        </div>

        <div className={style.infoHero}>
          <h3>
            {name}
          </h3>

          <div className={style.btns}>
            <Btn action="homepage" url={homepage} />
            <Btn action="wiki" url={wiki} />
          </div>
        </div>

      </header>

      <p className={style.descr}>
        {descr}
      </p>

      <h4>
        {comicsItems.lenght === 0 ? "does not contain a comics" : "Comics:"}
      </h4>

      <ul className={style.comicsList}>
        {comicsItems}
      </ul>
    </div>


  );
};

export default HeroDescr;