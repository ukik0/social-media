import { RequestLayout } from './Request/RequestLayout';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

export * from './Header/BurgerMenu/BurgerMenu';
export * from './Header/Search/Search';
export * from './Header/Auth/Auth';
export * from './Header/Auth/User/User';
export * from './Header/BurgerMenu/Navigation/Navigation';
export * from './Header/Search/Result/Result';
export * from './Header/Search/useSearch';
export const Layouts = {
    Header,
    Footer,
    RequestLayout
};
