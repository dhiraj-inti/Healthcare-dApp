import Table from 'react-bootstrap/Table';
import userContext from '../context/users/userContext';
import React, { useContext, useState, useEffect } from 'react';
import PharmacistContext from '../context/pharmscists/pharmacistContext';

export const AccountDetails = (props) => {
  const [details, setDetails] = useState(null);
  const UserContext = useContext(userContext);
  const PharmaContext = useContext(PharmacistContext);

  const { getUser } = UserContext;
  const { getPharmacist } = PharmaContext;

  useEffect(() => {

    async function init() {
      let json = {}
      if (props.type === "user") {
        const token = localStorage.getItem('token');
        json = await getUser(token);
        json.Account = props.account;
        setDetails(json);
      }
      else if (props.type === "pharmacist") {
        const token = localStorage.getItem('pharmaToken');
        json = await getPharmacist(token);
        json.Account = props.account
        setDetails(json);
      }
      else {
        json = {
          name: "Admin",
          Account: props.account
        }
        setDetails(json)

      }
      

    }
    init()


  }, [])


  return (
    <>
      <div>
        <h1>Account Details</h1>
        
        <Table striped bordered style={{ marginTop: "20px", width: "500px" }}>
          {details!==null && (props.type==="user" || props.type==="pharmacist") &&<tbody>
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
              <td>{details.Account}</td>
            </tr>
          </tbody>}
        </Table>
      </div>
    </>
  );

};
