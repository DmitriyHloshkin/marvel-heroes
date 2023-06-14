import style from './Spiner.module.scss'

import spinerSvg from './Spinner-1s-200px.svg';

const Spiner = (props) => {
  return (
    <img src={spinerSvg} alt="spinerSvg" className={style.spiner}/>
  );
}

export default Spiner;