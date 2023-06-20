import style from './heroesCard.module.scss';

const HeroesCard = (props) => {
  const {name, id, imgPath, onClick} = props;

  return (
      <li className={style.wrapper} 
          data-id-hero={id} 
          onClick={() => onClick(id)}
          tabIndex="0" >

        <div className={style.imgHero}>
            <img src={imgPath} alt={name} />
        </div>

        <div className={style.nameHero}>
          {name}
        </div>

      </li>
    
  );
}

export default HeroesCard;