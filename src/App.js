import React, { useEffect,useState } from 'react';
import './App.css';
import Web3 from 'web3';
import Appointments from './abi/Appointments.json'

function App() {
  const ethereum = window.ethereum;
  let web3 = window.web3;
  const [account, setaccount] = useState("");
  const [netId, setNetId] = useState()
  const [contract, setContract] = useState(null);
  

  useEffect(() => {

    async function loadBlockchainData() {
      const acc = await web3.eth.getAccounts();
      setaccount(acc[0]);
<<<<<<< HEAD
      console.log(acc[0])
      setNetId(await web3.eth.net.getId());
      console.log(netId)
=======
>>>>>>> ae22373586133228923e77e9fa487b216dcfebde
    }
  
    async function loadWeb3() {
  
      if (ethereum) {
        web3 = new Web3(ethereum);
        await ethereum.enable();
        const x = await web3.eth.net.getId()
        setNetId(x)
        const networkData = Appointments.networks[x];
        const t_contract = new web3.eth.Contract(Appointments.abi, networkData.address);
        setContract(t_contract);
        const resp = await t_contract.methods.getAllAppointments().call()
        console.log(resp)
      } else if (web3) {
        web3 = new Web3(web3.currentProvider);
      } else {
        window.alert('Please use metamask')
      }
    }

    loadWeb3()
    loadBlockchainData()
    
    // fetchDataFromBlockchain();
    // eslint-disable-next-line
  }, [])


  return (
    <div className="App">
      Hello this is Helathcare dApp {account} {netId}
    </div>
  );
}

export default App;
