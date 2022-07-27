import style from './App2.module.css';
import {Link} from 'react-router-dom';

function notification (e) {
    e.preventDefault();
    let name = document.querySelector('.name').value;
    let ethAddress = document.querySelector('.ethAddress').value;
    let street = document.querySelector('.street').value;
    let city = document.querySelector('.city').value;
    let country = document.querySelector('.country').value;
    let postal = document.querySelector('.postal').value;

    if (!name || !ethAddress || !street || !city || !country || !postal) {
        alert('Error (rellene todos los campos) ❌');
    } else {
        fetch('https://sheet.best/api/sheets/18415df0-3a54-46ca-9704-d46c1c0a5cfa', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "NOMBRE_Y_APELLIDO": name,
                "ETH_ADDRESS": ethAddress,
                "CALLE": street,
                "CIUDAD": city,
                "PAIS": country,
                "CODIGO_POSTAL": postal,
            })
        });
        alert('Tus datos se han guardado/actualizado correctamente ✅');
    }
};

export function App2 () {

    return(
        <div className={style.container}>
            <h2><Link to="/" onClick={() => {window.location.href="/"}} style={{ textDecoration: 'none', color: 'white' }}>Shop</Link></h2>
            <h1>YOUR ACCOUNT</h1>
            <p>Aquí podrás actualizar tus datos de envío<br></br>Para más informacion, contacta con vulturefxtrading@gmail.com<br></br><b>Envíos solo a Península</b> 🇪🇸 </p>
            <form className='form'>
                Nombre y Apellido<input className='name'></input>
                Dirección de Ethereum (con la que realizas el pago)<input className='ethAddress'></input>
                Calle, puerta<input className='street'></input>
                Ciudad<input className='city'></input>
                País<input className='country'></input>
                Código Postal<input className='postal'></input>
                <input className={style.submit} type='submit' onClick={notification}></input>
            </form>
            <p className={style.note}>* En caso de error con el pago, o con sus datos, se le devolverá automaticamente el dinero en un plazo de 7 días *</p>
            <p className={style.note}>Puedes analizar nuestro contrato aquí - <a style={{color: "rgba(255, 255, 255, 0.56)"}} href='https://polygonscan.com/address/0x157f938d313d83bb2c3d1a61a8878d42bb5c85c1#code'>0x157f938d313d83Bb2c3D1A61a8878d42bB5c85c1</a></p>
        </div>
    );
}