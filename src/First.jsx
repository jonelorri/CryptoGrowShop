import style from './First.module.css';
import background from './img/background.jpg';

export function First () {
    let i = 0;
    let text = "BUY YOUR SEEDS WITH CRYPTO";

    function typing() {
        if (i < text.length) {
            document.querySelector('.title').innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 100)
        }
    }

    document.addEventListener('readystatechange', event => {
        typing();
    });

    return(
        <div style={{backgroundImage: `url(${background})`}} className={style.container}>
            <h1 className='title'></h1>
            <h2>Do it the easy way</h2>
            <div className={style.gradient}></div>
        </div>
    );
}