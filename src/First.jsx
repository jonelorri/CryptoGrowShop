import style from './First.module.css';
import background from './img/background.jpg';

export function First () {
    return(
        <div style={{backgroundImage: `url(${background})`}} className={style.container}>
            <h1>BUY YOUR SEEDS WITH CRYPTO</h1>
            <h2>Do it the easy way</h2>
            <div className={style.gradient}></div>
        </div>
    );
}