import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import userContext from "../../context/users/userContext";
import Web3 from "web3";
export const BookAppointment = (props) => {
  const [details, setDetails] = useState({
    doctorId: "",
    doctorName: "",
    patientId: "",
    patientName: "",
    slotNo: "0",
    date: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [Tommorowdate, setTommorowDate] = useState();
  const context = useContext(userContext);
  const contract = props.contract;
  let web3 = window.web3;
  const ethereum = window.ethereum;
  const [account, setacc] = useState([]);

  const { bookAppointment,getUser } = context;
  useEffect(() => {
    async function loadBlockchainData() {
      web3 = new Web3(ethereum);
      let x = await web3.eth.getAccounts();
      setacc(x);
    }
    async function getAllDoctors() {
      const resp = await fetch(
        "http://localhost:5000/api/auth/doctor/getalldoctors",
        {
          method: "GET",
        }
      );

      const doctorArray = await resp.json();
      setDoctors(doctorArray);
    }
    async function getAppointmentDetails() {
      if (localStorage.getItem("token")) {
        const user = await getUser(localStorage.getItem("token"));
        if (user._id) {
          details.patientName = user.name;
          //details.doctorId = value from dropdown
          //details.doctorName = doctor name from db
        } else {
          console.log("Auth token not found");
        }
      }
    }
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth() + 1;
    let yyyy = currentDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    setTommorowDate(`${dd}-${mm}-${yyyy}`);
    loadBlockchainData();
    getAllDoctors();
    getAppointmentDetails();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    let isSubmit = true;
    console.log(details)

    /*const isDateValid = dateValidation();

    if (!isDateValid) {
      alert("Date cannot be in the past.");
      isSubmit = false;
    }*/
    // bookAppointment(details.patientName,details.doctorName, details.slotNo, details.date);
    if (isSubmit && details.slotNo!=="0") {
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
    else{
      alert("Choose Slot Number!")
    }
  };
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    console.log(details)
  };
  /*const dateValidation = () => {
    var now = new Date();
    if (details.date == now.toJSON().slice(0, 10) + 1) {
      return false;
    }
    return true;
  };*/
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
                  <option >Choose doctor id</option>
                  {doctors.map((ele,i)=>{
                    return(
                      <option key={i} value={i+1}>{i+1}</option>
                    )
                  })}
                  
                </Form.Control>
              </div>
              <div style={{ marginRight: "30px" }}>
                <Form.Label>Slot Number</Form.Label>
                <Form.Control
                  onChange={onChange}
                  as="select"
                  placeholder="Select Slot Number"
                  name="slotNo"
                  value={details.slotNo}
                >
                  <option >Choose Slot Number</option>
                  <option key={1} value="1">1</option>
                  <option key={2} value="2">2</option>
                  <option key={3} value="3">3</option>
                  <option key={4} value="4">4</option>
                  <option key={5} value="5">5</option>
                  
                </Form.Control>
              </div>
            </Form.Group>
            <Form.Group
              style={{ display: "flex", flexDirection: "row" }}
              className="mb-3"
              controlId="doctor_patient_Details"
            >
            </Form.Group>
            {/* <Form.Group
              style={{ display: "flex", flexDirection: "row" }}
              className="mb-3"
              controlId="slotDetails"
            >
            <div style={{display:"flex",flexDirection:"column",marginRight:"30px"}}>
            <div>
                <Form.Label>Patient Id</Form.Label>
                <Form.Control
                  onChange={onChange}
                  type="text"
                  placeholder="Enter id"
                  name="patientId"
                  value={details.patientId}
                />
              </div>
            </div>
            </Form.Group> */}
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
