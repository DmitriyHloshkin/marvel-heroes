import style from './Error.module.scss';

import errorImg from './error.gif';

const Error = (props) => {
  return (
    <img src={errorImg} alt="Error" className={style.error}/>
  );
}

export default Error;