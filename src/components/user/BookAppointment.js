import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import userContext from "../../context/users/userContext";
import Web3 from "web3";
export const BookAppointment = (props) => {
  const [details, setDetails] = useState({
    doctorId: "",
    doctorName: "",
    patientName: "",
    slotNo: "",
    date: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [Tommorowdate, setTommorowDate] = useState();
  const context = useContext(userContext);
  const contract = props.contract;
  let web3 = window.web3;
  const ethereum = window.ethereum;
  const [account,setacc] = useState([])

  const { bookAppointment,getUser } = context;
  useEffect(() => {
    async function loadBlockchainData() {
      web3 = new Web3(ethereum);
      let x = await web3.eth.getAccounts();
      setacc(x)
    }

    async function getAllDoctors() {
      const resp = await fetch(
        "http://172.22.62.194:5000/api/auth/doctor/getalldoctors",
        {
          method: "GET",
        }
      );

      const doctorArray = await resp.json();
      setDoctors(doctorArray);
    }
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth() + 1;
    let yyyy = currentDate.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    setTommorowDate(`${dd}-${mm}-${yyyy}`)
    loadBlockchainData()
    getAllDoctors();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    let isSubmit = true;
    const isDateValid = dateValidation();

    if (!isDateValid) {
      alert("Date cannot be in the past.");
      isSubmit = false;
    }
    // bookAppointment(details.patientName,details.doctorName, details.slotNo, details.date);
    if (isSubmit) {
      details.date = Tommorowdate;
      try {
        const user = await getUser(localStorage.getItem('token'))
        const hash = await contract.methods
          .addToBlockchain(
            user.name,
            doctors[parseInt(details.doctorId)-1].name,
            parseInt(details.doctorId),
            details.slotNo,
            Tommorowdate
          )
          .send({ from: account[0] });
        alert("Appointment booked successfully !");
      } catch (error) {
        alert("Slot already filled");
      }
    }
  };
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const dateValidation = () => {
    var now = new Date();
    if (details.date == now.toJSON().slice(0, 10) + 1) {
      return false;
    }
    return true;
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <h1>Book an Appointment</h1>
          <br></br>
          <Form
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "column" }}
            method="POST"
          >
            <Form.Group
              style={{ display: "flex", flexDirection: "row" }}
              className="mb-3"
              controlId="doctor_patient_Details"
            >
              <div style={{ marginRight: "30px" }}>
                <Form.Label>Doctor id</Form.Label>
                <Form.Control
                  onChange={onChange}
                  as="select"
                  placeholder="Select Doctor id"
                  name="doctorId"
                  value={details.doctorId}
                >
                  {doctors.map((ele,i)=>{
                    return(
                      <option key={i} value={i+1}>{i+1}</option>
                    )
                  })}
                  
                </Form.Control>
              </div>
            </Form.Group>
            <Form.Group
              style={{ display: "flex", flexDirection: "row" }}
              className="mb-3"
              controlId="doctor_patient_Details"
            >
            </Form.Group>
            <Form.Group
              style={{ display: "flex", flexDirection: "row" }}
              className="mb-3"
              controlId="slotDetails"
            >
              <div style={{ marginRight: "30px" }}>
                <Form.Label>Slot number</Form.Label>
                <Form.Control
                  onChange={onChange}
                  type="text"
                  placeholder="Enter Slot number"
                  name="slotNo"
                  value={details.slotNo}
                />
              </div>
            </Form.Group>
            <div style={{ marginRight: "30px" }}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
        <div style={{ position: "absolute", left: "700px" }}>
          <h1>Doctor Details</h1>
          <table className="table table-info table-hover table-striped-columns">
            <thead>
              <tr>
                <th scope="col">Doctor ID</th>
                <th scope="col">Doctor Name</th>
                <th scope="col">Specialization</th>
              </tr>
            </thead>
            <tbody className="table-hover">
              {doctors.map((ele, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{ele.name}</td>
                    <td>{ele.specialization}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
