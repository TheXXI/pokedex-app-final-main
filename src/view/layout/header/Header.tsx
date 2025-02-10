import { NavLink } from 'react-router-dom'
import css from './header.module.scss'
import logotype from './images/logo.png'

export const Header = () => {
    return (
        <header className={css.header}>
            <img src={logotype} alt="Ошибка 404" />
            <nav>
                <NavLink to="/">Главная</NavLink> 
                <NavLink to="/caught">Пойманные покемоны</NavLink> 
            </nav>
        </header>
    )
}