import Table from 'react-bootstrap/Table';
import userContext from '../context/users/userContext';
import React, { useContext, useState, useEffect } from 'react';
import PharmacistContext from '../context/pharmscists/pharmacistContext';
import Web3 from "web3";

export const AccountDetails = (props) => {
  const [details, setDetails] = useState(null);
  const UserContext = useContext(userContext);
  const PharmaContext = useContext(PharmacistContext);
  const { getUser } = UserContext;
  const { getPharmacist } = PharmaContext;
  let web3 = window.web3;
  const ethereum = window.ethereum;
  const [acc,setacc] = useState([])

  useEffect(() => {


    async function loadBlockchainData() {
      web3 = new Web3(ethereum);
      let x = await web3.eth.getAccounts();
      setacc(x)
    }

    async function init() {
      let json = {}
      if (props.type === "user") {
        const token = localStorage.getItem('token');
        json = await getUser(token);
        // json.Account = acc[0];
        setDetails(json);
      }
      else if (props.type === "pharmacist") {
        const token = localStorage.getItem('pharmaToken');
        json = await getPharmacist(token);
        // json.Account = acc[0];
        setDetails(json);
      }
      else {
        json = {
          name: "Admin",
          email: "admin@healthcareDapp.com",
          phoneNumber: "888889000"
        }
        setDetails(json)
      }
      

    }
    loadBlockchainData()
    init()


  }, [])


  return (
    <>
      <div>
        <h1>Account Details</h1>
        
        <Table striped bordered style={{ marginTop: "20px", width: "500px" }}>
          {details!==null && props.type==="user" &&<tbody>
            <tr>
              <td><b>Id</b></td>
              <td>{details._id}</td>
            </tr>
            <tr>
              <td><b>Name</b></td>
              <td>{details.name}</td>
            </tr>
            <tr>
              <td><b>DOB</b></td>
              <td>{details.dob}</td>
            </tr>
            <tr>
              <td><b>Phone number</b></td>
              <td>{details.phoneNumber}</td>
            </tr>
            <tr>
              <td><b>Medical History</b></td>
              <td><a href={details.ipfsPath} target='_blank'>Click here</a></td>
            </tr>
            <tr>
              <td><b>E - Mail</b></td>
              <td>{details.email}</td>
            </tr>
            <tr>
              <td ><b>Account Address</b></td>
              <td>{acc[0]}</td>
            </tr>
          </tbody>}
          {details!==null && props.type==="pharmacist" &&<tbody>
            <tr>
              <td><b>Id</b></td>
              <td>{details._id}</td>
            </tr>
            <tr>
              <td><b>Name</b></td>
              <td>{details.name}</td>
            </tr>
            <tr>
              <td><b>DOB</b></td>
              <td>{details.dob}</td>
            </tr>
            <tr>
              <td><b>Phone number</b></td>
              <td>{details.phoneNumber}</td>
            </tr>
            <tr>
              <td><b>E - Mail</b></td>
              <td>{details.email}</td>
            </tr>
            <tr>
              <td ><b>Account Address</b></td>
              <td>{acc[0]}</td>
            </tr>
          </tbody>}
          {details!==null && props.type==="admin" && <tbody>
            <tr>
              <td><b>Name</b></td>
              <td>{details.name}</td>
            </tr>
            <tr>
              <td><b>E - Mail</b></td>
              <td>{details.email}</td>
            </tr>
            <tr>
              <td><b>Phone number</b></td>
              <td>{details.phoneNumber}</td>
            </tr>
            <tr>
              <td><b>Account Address</b></td>
              <td>{acc[0]}</td>
            </tr>
          </tbody>}
        </Table>
      </div>
    </>
  );

};
