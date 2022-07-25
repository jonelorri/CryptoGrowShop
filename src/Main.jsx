import {First} from './First.jsx';
import {Second} from './Second.jsx';
import style from './Main.module.css';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import abi from "./utils/SeedSale.json";
import { ethers } from "ethers";

export function Main () {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xF5a6D5b7684B499693216a2ccE30bC8A0A91A4B4";
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
          alert("Get MetaMask!");
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

      if (ethereum && priceW > 0.003) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const seedSaleContract = new ethers.Contract(contractAddress, contractABI, signer);

        const price = {value: ethers.utils.parseEther(priceW)};
        const Txn = await seedSaleContract.sendValues(aValue, fValue, price);
        console.log("Mining...", Txn.hash);

        await Txn.wait();
        console.log("Mined -- ", Txn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getData = (priceW, aValue, fValue) => {
    SeedSale(priceW, aValue, fValue);
  };

  useEffect(() => {
      checkIfWalletIsConnected();
  }, [])

  return (
      <div>
          <div className={style.navbar}>
              <h2 className={style.account}><Link to="/account" style={{ textDecoration: 'none', color: 'white' }}>Account</Link></h2>
              {!currentAccount && (
                  <h2 onClick={connectWallet} className={style.login}>Login</h2>
              )}
          </div>
          <First></First>
          <Second onClick={getData}></Second>
          <footer>
          </footer>
      </div>
  );
}