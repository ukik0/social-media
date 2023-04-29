import cl from './Loader.module.scss';

export const Loader = () => {
    return (
        <main className={cl.loader}>
            <div className={cl.spinner}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    );
};
