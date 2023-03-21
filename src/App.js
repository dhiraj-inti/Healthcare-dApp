import React, { useEffect,useState } from 'react';
import './App.css';
import Web3 from 'web3';
import Appointments from './abi/Appointments.json'
import DrugInventory from './abi/DrugInventory.json'

function App() {
  const ethereum = window.ethereum;
  let web3 = window.web3;
  const [account, setaccount] = useState("");
  const [netId, setNetId] = useState()
  const [contract, setContract] = useState(null);
  const [DIContract, setDIContract] = useState(null);
  const [res, setResp] = useState([])
  const [drugRes, setDrugRes] = useState([])
  

  useEffect(() => {

    async function loadBlockchainData() {
      const acc = await web3.eth.getAccounts();
      setaccount(acc[0]);
    }
  
    async function loadWeb3() {
  
      if (ethereum) {
        web3 = new Web3(ethereum);
        await ethereum.enable();
        const x = await web3.eth.net.getId()
        setNetId(x)
        const networkData = Appointments.networks[x];
        const networkDataDI = DrugInventory.networks[x];
        const t_contract = new web3.eth.Contract(Appointments.abi, networkData.address);
        const DI_contract = new web3.eth.Contract(DrugInventory.abi, networkDataDI.address);
        setDIContract(DI_contract);
        setContract(t_contract);
        const resp = await t_contract.methods.getAllAppointments().call()
        const respDI = await DI_contract.methods.getAllReceipts().call()
        let t = []
        let DI = []
        for(let i=0;i<resp.length;++i){
          t.push(JSON.stringify({
            "Doctor":resp[i].doctor,
            "Patient":resp[i].patient,
            "Slot Number":resp[i].slotNo,
            "Timestamp":resp[i].timestamp
          }))
        }

        for(let i=0;i<respDI.length;++i){
          DI.push(JSON.stringify({
            "Doctor ID":respDI[i].doctorId,
            "Patient":respDI[i].patientName,
            "Pharmacist":respDI[i].pharmaId,
            "Medicines":respDI[i].medicines,
            "Timestamp":respDI[i].timestamp
          }))
        }
        setResp(t);
        setDrugRes(DI);
      } else if (web3) {
        web3 = new Web3(web3.currentProvider);
      } else {
        window.alert('Please use metamask')
      }
    }

    loadWeb3()
    loadBlockchainData()
    // eslint-disable-next-line
  }, [])


  return (
    <div className="App">
      <h3>Account used on this page is : {account}</h3> 
      <div>
        <h1>Appointments Details</h1>
        {res.map((ele)=>{
          return (
            <div>
              {ele}
            </div>
          )
        })}
      </div>

      <div>
        <h1>Drug Inventory Details</h1>
        {drugRes.map((ele)=>{
          return (
            <div>
              {ele}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
