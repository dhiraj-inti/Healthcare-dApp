import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PharmacistContext from "../../context/pharmscists/pharmacistContext";
import Web3 from "web3";

export const SellMedicine = (props) => {
  const [details, setDetails] = useState({
    doctorId: "0",
    doctorName: "",
    pharmaId: "",
    pharmaName: "",
    patientId: "",
    patientName: "",
    slotNo: "",
    date: "",
    description: "",
  });
  const context = useContext(PharmacistContext);
  const { generateReceipt, getPharmacist } = context;
  const contract = props.contract;

  let web3 = window.web3;
  const ethereum = window.ethereum;
  const [account,setacc] = useState([])
  const [doctors, setDoctors] = useState([]);
  const [Todaydate, setTodayDate] = useState();
  useEffect(() => {
    async function loadBlockchainData() {
      web3 = new Web3(ethereum);
      let x = await web3.eth.getAccounts();
      setacc(x)
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

    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth() + 1;
    let yyyy = currentDate.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    getAllDoctors();
    loadBlockchainData();
    setTodayDate(`${dd}-${mm}-${yyyy}`)
  }, []);
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    let isSubmit = true;
    
    e.preventDefault();
    // const isDateValid = dateValidation();
    // if (!isDateValid) {
    //   alert("Date cannot be in the future, re enter the date.");
    //   isSubmit = false;
    // }
    //generateReceipt(details.doctorName,details.patientName,details.slotNo,details.date,details.description);
    if (isSubmit) {
      const description = details.description.split("\n");
      for (let i = 0; i < description.length; i++) {
        const innerdescription = description[i].split(",");
        description[i] = innerdescription;
      }
      if(details.doctorId==="0"){
        alert("Select Doctor ID");
        return;
      }

      const pharmacist = await getPharmacist(localStorage.getItem('pharmaToken'));
      console.log(pharmacist._id)
      try {
        const hash = await contract.methods
          .addReceipt(
            details.patientName,
            parseInt(details.doctorId),
            pharmacist.dId,
            description,
            Todaydate
          )
          .send({ from: account[0] });
        alert("Receipt added successfully !");
      } catch (error) {
        console.log(error.value)
        alert('Details not filled properly or the transaction is failed!');
      }
    }
  };
  const dateValidation = () => {
    var now = new Date();
    if (details.date > now.toJSON().slice(0, 10)) {
      return false;
    }
    return true;
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <h1>Enter Receipt Details</h1>
          <br></br>
          <Form
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Form.Group
              style={{ display: "flex", flexDirection: "row" }}
              className="mb-3"
              controlId="doctor_Details"
            >
              <div style={{ marginRight: "30px" }}>
                <Form.Label>Doctor id</Form.Label>
                <Form.Control
                  onChange={onChange}
                  as="select"
                  name="doctorId"
                  value={details.doctorId}
                >
                  <option value="0">Choose doctor id</option>
                  {doctors.map((ele,i)=>{
                    return(
                      <option key={i} value={i+1}>{i+1}</option>
                    )
                  })}
                  
                </Form.Control>
              </div>
              {/* <div style={{ marginRight: "30px" }}>
                <Form.Label>Doctor name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Doctor name"
                  onChange={onChange}
                  name="doctorName"
                  value={details.doctorName}
                />
              </div> */}
            </Form.Group>
            <Form.Group
              style={{ display: "flex", flexDirection: "row" }}
              className="mb-3"
              controlId="pharmacist_Details"
            >
              {/* <div style={{ marginRight: "30px" }}>
                <Form.Label>Pharmacist id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Pharma id"
                  onChange={onChange}
                  name="pharmaId"
                  value={details.pharmaId}
                />
              </div> */}
              {/* <div style={{ marginRight: "30px" }}>
                <Form.Label>Pharmacist name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Pharma name"
                  onChange={onChange}
                  name="pharmaName"
                  value={details.pharmaName}
                />
              </div> */}
            </Form.Group>
            <Form.Group
              style={{ display: "flex", flexDirection: "row" }}
              className="mb-3"
              controlId="patient_Details"
            >
              {/* <div style={{ marginRight: "30px" }}>
                <Form.Label>Patient id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Patient id"
                  onChange={onChange}
                  name="patientId"
                  value={details.patientId}
                />
              </div> */}
              <div style={{ marginRight: "30px" }}>
                <Form.Label>Patient name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Patient name"
                  onChange={onChange}
                  name="patientName"
                  value={details.patientName}
                />
              </div>
            </Form.Group>
            {/* <Form.Group
              style={{ display: "flex", flexDirection: "row" }}
              className="mb-3"
              controlId="slotDetails"
            >
              <div style={{ marginRight: "30px" }}>
                <Form.Label>Slot number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Slot number"
                  onChange={onChange}
                  name="slotNo"
                  value={details.slotNo}
                />
              </div>
              
            </Form.Group> */}
            <Form.Group>
              <div style={{ marginRight: "30px" }}>
                <Form.Label>Enter Description</Form.Label>
                <br></br>
                <textarea
                  style={{ width: "450px", height: "200px" }}
                  placeholder="Enter description"
                  onChange={onChange}
                  name="description"
                  value={details.description}
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
          <br></br>
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
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
