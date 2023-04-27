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
import { UserSignup } from "./components/user/UserSignup"
import { UserLogin } from "./components/user/UserLogin";
import { PharmaLogin } from "./components/pharmacist/PharmaLogin";
import { AdminLogin } from "./components/admin/AdminLogin";
//import { AdminHome } from "./components/home/AdminHome";
import { Home } from "./components/home/Home.js";
import { BookAppointment } from "./components/user/BookAppointment";
import { SellMedicine } from "./components/pharmacist/SellMedicine";
import { AccountDetails } from "./components/AccountDetails";
//import { UserHome } from "./components/home/UserHome";
import UserState from "./context/users/UserState";
import PharmacistState from "./context/pharmscists/pharmacistState";
import { MedicineDetail } from "./components/pharmacist/MedicineDetail";
import { SearchByRfid } from "./components/user/SearchByRfid";
//import { PharmaHome } from "./components/home/PharmaHome";
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
        setContract(t_contract);
        const d_contract = new web3.eth.Contract(
          DrugInventory.abi,
          networkDataDI.address
        );

        setDIContract(d_contract);
        const resp = await t_contract.methods.getAllAppointments().call();
        setResp(resp)

        const resp2 = await d_contract.methods.getAllReceipts().call()
        setDrugRes(resp2)
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
                <Route exact path="/user" element={<Home type="user" s1="Book an Appointment" s2="View Appointments for the day" s3="View your Account Details" />} />

                <Route
                  exact
                  path="/user/signup"
                  element={<UserSignup name="user" />}
                />
                <Route
                  exact
                  path="/user/login"
                  element={<UserLogin name="User" />}
                />
                <Route
                  exact
                  path="user/appointments"
                  element={<AppointmentsDetail contract={contract} />}
                />
                <Route
                  exact
                  path="user/bookappointment"
                  element={<BookAppointment contract={contract} account={account} />}
                />
                <Route
                  exact path="user/viewbyrfid"
                  element={<SearchByRfid contract={DIContract}/>}
                 /> 
                <Route
                  exact
                  path="user/accdetails"
                  element={<AccountDetails type="user" />}
                />

                <Route exact path="/pharma" element={<Home type="pharma" s1="Create and Add Receipts to Sell Medicines" s2="View Drug Inventory" s3="View your Account Details
"/>} />

                <Route exact path="pharma/login" element={<PharmaLogin name="Pharmacist" />} />

                <Route
                  exact
                  path="pharma/druginv"
                  element={<DrugInventoryDetail contract={DIContract} />}
                />
                <Route
                  exact path="pharma/viewmed"
                  element={<MedicineDetail contract={DIContract} />}
                />
                <Route
                  exact
                  path="pharma/sellmedicine"
                  element={<SellMedicine contract={DIContract} account={account} />}
                />
                <Route
                  exact
                  path="pharma/accdetails"
                  element={<AccountDetails type="pharmacist" />}
                />

                <Route exact path="admin" element={<Home type="admin" s1="View Appointments for the day" s2="View Drug Inventory" s3="View your Account Details" />} />
                <Route exact path="admin/login" element={<AdminLogin name="Admin" />} />
                <Route
                  exact
                  path="admin/appointments"
                  element={<AppointmentsDetail type="admin" contract={contract} />}
                />
                <Route
                  exact
                  path="admin/druginv"
                  element={<DrugInventoryDetail contract={DIContract} />}
                />
                <Route
                  exact
                  path="admin/viewmed"
                  element={<MedicineDetail contract={DIContract} />}
                />
                <Route
                  exact
                  path="admin/accdetails"
                  element={<AccountDetails type="admin" />}
                />
              </Routes>
            </div>
          </Router>
        </PharmacistState>
      </UserState>
    </>
  );
}
export default App;
