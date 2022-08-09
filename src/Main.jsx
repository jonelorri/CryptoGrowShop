//import {First} from './First.jsx';
import {Second} from './Second.jsx';
import style from './Main.module.css';
//import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import abi from "./utils/SeedSale.json";
import { ethers } from "ethers";
import tick from './img/tick.png';
import background from './img/background.jpg';

export function Main () {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x157f938d313d83Bb2c3D1A61a8878d42bB5c85c1";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
      try {
        const { ethereum } = window;
  
        if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
        } else {
          console.log("We have the ethereum object", ethereum);
        }
  
        /*
        * Check if we're authorized to access the user's wallet
        */
        const accounts = await ethereum.request({ method: "eth_accounts" });
  
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account)
        } else {
          console.log("No authorized account found")
        }
      } catch (error) {
        console.log(error);
      }
  }

  const connectWallet = async () => {
      try {
        const { ethereum } = window;
  
        if (!ethereum) {
          alert("You need to download Metamask");
          return;
        }
  
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.log(error)
      }
  }

  const SeedSale = async (priceW, aValue, fValue) => {
    try {
      const { ethereum } = window;

      if (ethereum && priceW > 6) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const seedSaleContract = new ethers.Contract(contractAddress, contractABI, signer);

        const price = {value: ethers.utils.parseEther(`${priceW}`)};
        const Txn = await seedSaleContract.sendValues(aValue, fValue, price);
        console.log("Mining...", Txn.hash);

        await Txn.wait();
        console.log("Mined -- ", Txn.hash);
        alert('Pedido realizado con éxito (te llegará en 2-5 días) ✅ Gracias')
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async (priceW, aValue, fValue) => {
    if(currentAccount) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(currentAccount);
      const balanceEth = ethers.utils.formatEther(balance);

      document.querySelector('.Main_message__V41dV').style.display = "flex";
      document.querySelector('.form').style.display = "flex";
      if (balanceEth > priceW) {
        SeedSale(priceW, aValue, fValue);
      } else {
        document.querySelector('.Main_message3__-0T3u').style.display = "block";
        setTimeout(() => {
          document.querySelector('.Main_message3__-0T3u').style.display = "none";
        }, 2000);
      }
    } 
    else {
      alert('Tienes que estar logueado')
    }
  };

  function notification (e) {
      e.preventDefault();
      let name = document.querySelector('.name').value;
      let ethAddress = document.querySelector('.ethAddress').value;
      let street = document.querySelector('.street').value;
      let city = document.querySelector('.city').value;
      let province = document.querySelector('.province').value;
      let country = document.querySelector('.country').value;
      let postal = document.querySelector('.postal').value;

      if (!name || !ethAddress || !street || !city || !province || !country || !postal) {
        alert('Error (rellene todos los campos) ❌');
      } 
      else {
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
              "PROVINCIA": province,
              "PAIS": country,
              "CODIGO_POSTAL": postal,
          })
        });
        document.querySelector('.form').style.display = "none";
        document.querySelector('.Main_message2__8VSpk').style.display = "flex";
      }
  };

  function changeDisplay() {
      document.querySelector('.Main_message__V41dV').style.display = "none";
      document.querySelector('.Main_message2__8VSpk').style.display = "none";
  }

  let i = 0;
  const text = "BUY YOUR SEEDS WITH CRYPTO";

  async function typing() {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (!accounts[0] && i < text.length) {
      document.querySelector('.title').innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 100)
    } 
    if (accounts[0]){
      document.querySelector('.title').innerHTML = text;
    }
  }

  typing();

  useEffect(() => {
    checkIfWalletIsConnected();
    document.querySelector('.form').style.display = "flex";
  }, [])

  return (
    <div>
        <div className={style.navbar}>
          {!currentAccount && (
            <h2 onClick={connectWallet} className={style.login}>Login</h2>
          )}
        </div>
        <div style={{backgroundImage: `url(${background})`}} className={style.first}>
          <h1 className='title'></h1>
          <h2>Do it the easy way</h2>
          <div className={style.gradient}></div>
        </div>
        <Second onClick={getData}></Second>
        <div className={style.message}>
          <form className='form'>
            <h1>Datos del envío</h1>
            Nombre y Apellido<input className='name'></input>
            Dirección de Ethereum<input className='ethAddress' value={currentAccount}></input>
            Calle, puerta<input className='street'></input>
            Ciudad<input className='city'></input>
            Provincia<input className='province'></input>
            País<input className='country'></input>
            Código Postal<input className='postal'></input>
            <input className={style.submit} type='submit' onClick={notification}></input>
          </form>
          <button onClick={changeDisplay}>X</button>
          <div className={style.message2}>
            <h1>Información actualizada</h1>
            <img alt='checkmark' src={tick} className={style.tick}></img>
          </div>
        </div>
        <div className={style.message3}>
          <h1>No tienes suficiente Matic</h1>
          <h2>X</h2>
        </div>
        <footer>
        </footer>
    </div>
  );
}