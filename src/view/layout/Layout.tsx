import { useEffect, useState } from 'react';
import { service } from '../../service/service';
import { Header } from './header/Header';
import css from './layout.module.scss'
import { Outlet } from "react-router-dom";
import { UpArrow } from './icons/UpArrow';

export const Layout = () => {
    service.initCaughtPokemons();
    const [isShowTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;

            scrollY > 50 ? setShowTopButton(true) : setShowTopButton(false);
        });
      }, []);

    const scrollOnTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }

    return (
        <div className={css.wrapper}>
            <Header />
            <main>
                <Outlet />

                {isShowTopButton &&
                    <button className={css.topButton} onClick={() => scrollOnTop()}>
                        <UpArrow />
                    </button>
                }
            </main>
            <footer>Pokedex app, 2024</footer>
        </div>
    )
}