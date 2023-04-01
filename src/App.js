import React, { useEffect, useState } from 'react';
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
        const d_contract = new web3.eth.Contract(DrugInventory.abi, networkData.address);
        setContract(t_contract);
        const resp = await t_contract.methods.getAllAppointments().call()
        const resp2 = await d_contract.methods.getReceipt().call()
        console.log(resp)
        console.log(resp2)
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
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="appointments" element={<AppointmentsDetail res={res} />} />
            <Route path="druginv" element={<DrugInventoryDetail drugRes={drugRes} />} />
          </Routes>
          
        </div>
      </Router>
    </>

  );
}
export default App;
