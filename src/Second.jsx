import style from './Second.module.css';
import seed from './img/seed.png';
import { useEffect, useState } from 'react';

export function Second(props) {
    const unitPrice = 6;
    const deliveryPrice = 6;
    const [aValue, setAValue] = useState(0);
    const [fValue, setFValue] = useState(0);
    const [price, setPrice] = useState((fValue * unitPrice) + (aValue * unitPrice) + deliveryPrice);

    const handleChange = event => {
        const result = event.target.value;
        setAValue(result);
    };

    const handleChange2 = event => {
        const result = event.target.value;
        setFValue(result);
    };

    const handleValue = () => {
        props.onClick(price, aValue, fValue);
    };

    useEffect(() => {
        setPrice((fValue * unitPrice) + (aValue * unitPrice) + deliveryPrice);
    }, [fValue, aValue]);

    return (
        <div>
            <div className={style.container1}>
                <img alt='semilla auto' src={seed}></img>
                <h1>AUTO ORIGINAL XXL</h1>
                <h3>
                    <b>Sativa/Índica:</b> 25/75%<br></br>
                    <b>Producción:</b> 450 g/m² en interior y 150 g/planta en exterior.<br></br>
                    <b>Floración:</b> en interior y exterior de 60-70 días desde que germina.<br></br>
                    <b>Altura:</b> en interior y exterior de 0,70-1,40m.<br></br>
                </h3>
                <input type='number' min="0" value={aValue} onChange={handleChange}></input>
            </div>
            <div className={style.container2}>
                <img alt='semilla auto' src={seed}></img>
                <h1>CRITICAL</h1>
                <h3>
                    <b>Sativa/Índica:</b> 50/50%<br></br>
                    <b>Producción:</b> 600 g/m² en interior y 1kg por planta en exterior.<br></br>
                    <b>Floración:</b> 8/9 semanas en interior y mediados-finales de septiembre en exterior.<br></br>
                    <b>Altura:</b> 60-80 cm en interior y 1,5-2 m en exterior.<br></br>
                </h3>
                <input type='number' min="0" value={fValue} onChange={handleChange2}></input>
            </div>
            <div className={style.container3}>
                    <div onClick={handleValue}>
                        <h1>PAY</h1>
                    </div>
                    <p className={style.price}><b>{price} matic</b><br></br><br></br> Solo aceptamos pagos en la red de <b>Polygon</b></p>
                    <p className={style.note}>* En caso de haber introducido mal tus datos, vuelve a dar al botón de <b>PAY</b> y rellena de nuevo el formulario * <br></br> Precio del envio = {deliveryPrice} matic (Tiempo de entrega, de 2 a 5 días laborables) <br></br>Soporte: vulturefxtrading@gmail.com</p>
            </div>
        </div>
    );
}