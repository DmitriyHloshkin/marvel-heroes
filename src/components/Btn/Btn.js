import style from './btn.module.scss';

const Btn = (props) => {
  const {action, url, onClick} = props;

  const getButtonOption = () => {
    let clazz = `${style.btn}`,
        title = '';

    switch(action) {
      case('homepage'):
        title = "homepage";
        break;

      case('wiki'):
        title = "wiki";
        clazz += ` ${style.wiki}`;
        break;

      case('tryIt'):
        title = "try it";
        break;

      case('loadMore'):
        title = "load more";
        clazz += ` ${style.loadMore}`;
        break;

      case('find'):
        title = "find";
        break;

      case('toPage'):
        title = "to page";
        clazz += ` ${style.toPage}`;
        break;

      default:
        title = "homepage";
    }

    return ({
      title,
      clazz,
    });
  };

  const {clazz, title} = getButtonOption();

  let link = url ? <a className={style.link} href={url} target='_blank' rel='noreferrer'><span>{title}</span></a> : title;

  return (
    <button className={clazz} 
            data-action={action}
            onClick={onClick}>
      {link}
    </button>
  );
}

export default Btn;