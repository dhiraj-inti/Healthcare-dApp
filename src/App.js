import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import Appointments from "./abi/Appointments.json";
import DrugInventory from "./abi/DrugInventory.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentsDetail from "./components/user/AppointmentsDetail";
import { DrugInventoryDetail } from "./components/pharmacist/DrugInventoryDetail";
import { Navbar } from "./components/Navbar";
import { First } from "./components/First";
import { UserLogin } from "./components/user/UserLogin";
import { PharmaLogin } from "./components/pharmacist/PharmaLogin";
import { AdminLogin } from "./components/admin/AdminLogin";
import { BookAppointment } from "./components/user/BookAppointment/BookAppointment";
import { SellMedicine } from "./components/pharmacist/SellMedicine/SellMedicine";
import { AccountDetails } from "./components/AccountDetails";
import UserState from "./context/users/UserState";
import PharmacistState from "./context/pharmscists/pharmacistState";
function App() {
  const ethereum = window.ethereum;
  let web3 = window.web3;
  const [account, setaccount] = useState("");
  const [netId, setNetId] = useState();
  const [contract, setContract] = useState(null);
  const [DIContract, setDIContract] = useState(null);
  const [res, setResp] = useState([]);
  const [drugRes, setDrugRes] = useState([]);

  useEffect(() => {
    async function loadBlockchainData() {
      const acc = await web3.eth.getAccounts();
      setaccount(acc[0]);
    }

    async function loadWeb3() {
      if (ethereum) {
        web3 = new Web3(ethereum);
        await ethereum.enable();
        const x = await web3.eth.net.getId();
        setNetId(x);
        const networkData = Appointments.networks[x];
        const networkDataDI = DrugInventory.networks[x];
        const t_contract = new web3.eth.Contract(
          Appointments.abi,
          networkData.address
        );
        const d_contract = new web3.eth.Contract(
          DrugInventory.abi,
          networkData.address
        );
        setContract(t_contract);
        const resp = await t_contract.methods.getAllAppointments().call();
        const resp2 = await d_contract.methods.getReceipt().call();
        console.log(resp);
        console.log(resp2);
      } else if (web3) {
        web3 = new Web3(web3.currentProvider);
      } else {
        window.alert("Please use metamask");
      }
    }

    loadWeb3();
    loadBlockchainData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <UserState>
      <PharmacistState>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<First />} />
            
              <Route
                exact
                path="userlogin"
                element={<UserLogin name="user" />}
              />
              <Route
                exact
                path="user/appointments"
                element={<AppointmentsDetail res={res} />}
              />
              <Route
                exact
                path="user/bookappointment"
                element={<BookAppointment />}
              />
            
            <Route exact path="pharmalogin" element={<PharmaLogin />} />
            <Route exact path="adminlogin" element={<AdminLogin />} />

            <Route
              exact
              path="pharma/druginv"
              element={<DrugInventoryDetail drugRes={drugRes} />}
            />
            <Route
              exact
              path="pharma/sellmedicine"
              element={<SellMedicine />}
            />
            <Route exact path="accdetails" element={<AccountDetails />} />
          </Routes>
        </div>
      </Router>
      </PharmacistState>
      </UserState>
    </>
  );
}
export default App;
