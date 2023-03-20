import React, { useEffect,useState } from 'react';
import './App.css';
import Web3 from 'web3';

function App() {
  const ethereum = window.ethereum;
  let web3 = window.web3;
  const [account, setaccount] = useState("");
  const [netId, setNetId] = useState()

  useEffect(() => {

    async function loadBlockchainData() {
      const acc = await web3.eth.getAccounts();
      setaccount(acc[0]);
      console.log(acc[0])
      setNetId(await web3.eth.net.getId());
      console.log(netId)
    }
  
    async function loadWeb3() {
  
      if (ethereum) {
        web3 = new Web3(ethereum);
        await ethereum.enable();
      } else if (web3) {
        web3 = new Web3(web3.currentProvider);
      } else {
        window.alert('Please use metamask')
      }
    }
    loadWeb3();
    loadBlockchainData();
    // eslint-disable-next-line
  }, [])


  return (
    <div className="App">
      Hello this is Helathcare dApp {account} {netId}
    </div>
  );
}

export default App;
