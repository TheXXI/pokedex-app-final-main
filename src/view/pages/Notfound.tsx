import css from './pages.module.scss'
import { Link } from "react-router-dom";
import notFoundImage from './images/404.jpg';

export const Notfound = () => {
  return (
      <div className={css.notfound}>
        <h1>Ошибка 404</h1>
        <img src={notFoundImage} alt="Ошибка 404" />
        <span>Страница не найдена</span>
        <Link to="/">На главную</Link>
      </div>
    )
}