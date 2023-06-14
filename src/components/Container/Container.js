import style from './Containe.module.scss';

const Container = (prop) => {
  const {children} = prop;

  return (
    <div className={style.container}>
      {children}
    </div>
  );
}

export default Container;