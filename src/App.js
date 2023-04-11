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
import { AdminHome } from "./components/home/AdminHome";
import { BookAppointment } from "./components/user/BookAppointment";
import { SellMedicine } from "./components/pharmacist/SellMedicine";
import { AccountDetails } from "./components/AccountDetails";
import { UserHome } from "./components/home/UserHome";
import UserState from "./context/users/UserState";
import PharmacistState from "./context/pharmscists/pharmacistState";
import { PharmaHome } from "./components/home/PharmaHome";
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
        //const networkData = Appointments.networks[x];
        const networkDataDI = DrugInventory.networks[x];
        /*const t_contract = new web3.eth.Contract(
          Appointments.abi,
          networkData.address
        );*/
        const d_contract = new web3.eth.Contract(
          DrugInventory.abi,
          networkDataDI.address
        );
        //const resp = await t_contract.methods.getAllAppointments().call();
        //setResp(resp)
        
        const resp2 = await d_contract.methods.getAllReceipts().call()
        //console.log(resp2)
        setDrugRes(resp2)
        d_contract.methods.addReceipt("Dhunna",2,3,[["P 650","2"]]).send({from:account}).then((receipt) =>{
          console.log(receipt)
      })
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
                <Route exact path="/user" element={<UserHome />} />

                <Route
                  exact
                  path="/user/login"
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
                <Route
                  exact
                  path="user/accdetails"
                  element={<AccountDetails />}
                />

                <Route exact path="/pharma" element={<PharmaHome />} />

                <Route exact path="pharma/login" element={<PharmaLogin />} />

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
                <Route
                  exact
                  path="pharma/accdetails"
                  element={<AccountDetails />}
                />

                <Route exact path="admin" element={<AdminHome />} />
                <Route exact path="admin/login" element={<AdminLogin />} />
                <Route
                  exact
                  path="admin/appointments"
                  element={<AppointmentsDetail res={res} />}
                />
                <Route
                  exact
                  path="admin/druginv"
                  element={<DrugInventoryDetail drugRes={drugRes} />}
                />
                <Route
                  exact
                  path="admin/accdetails"
                  element={<AccountDetails />}
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
