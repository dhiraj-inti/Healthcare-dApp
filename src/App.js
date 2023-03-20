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
      setNetId(await web3.eth.net.getId());
      const networkData = Appointments.networks[netId];
      if (networkData) {
        console.log("Network data", networkData);
        const abi = Appointments.abi;
        const address = networkData.address;
        console.log("Abi", abi);
        console.log("Address", address);
        const _contract = new web3.eth.Contract(abi, address);
        //console.log("Obtained contract", _contract);
        setContract(_contract);
        console.log(contract)
      } else {
        window.alert("Smart contract not deployed to detected network");
      }
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

    async function bookAnAppointment(){
      //const result = await contract.methods.getAllAppointments().call();
      console.log(contract.methods)
    }
    loadWeb3();
    loadBlockchainData();
    bookAnAppointment();
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
