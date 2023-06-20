import style from './ComicsListItem.module.scss';

const ComicsListItem = ({title, url}) => {

  return (
    <li className={style.comicsItem}>
      <a href={url} target='_blank' rel="noreferrer">{title}</a>
    </li>
  );
}

export default ComicsListItem;