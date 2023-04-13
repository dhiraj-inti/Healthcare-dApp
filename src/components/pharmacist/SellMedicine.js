import React, { useState, useContext, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PharmacistContext from "../../context/pharmscists/pharmacistContext";
import Web3 from "web3";

export const SellMedicine = (props) => {
  const [details, setDetails] = useState({
    doctorId: "",
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
  const { generateReceipt } = context;
  const contract = props.contract;
  const account = props.account;
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    async function getAllDoctors() {
      const resp = await fetch(
        "http://localhost:5000/api/auth/doctor/getalldoctors",
        {
          method: "GET",
        }
      );
  
      const doctorArray = await resp.json();
      setDoctors(doctorArray);
      console.log(doctorArray)
    }
  
    getAllDoctors();
  }, []);
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    //console.log(details)
  };
  const onSubmit = async (e) => {
    let isSubmit = true;
    e.preventDefault();
    //console.log(details);
    //console.log(contract)
    const isDateValid = dateValidation();
    if (!isDateValid) {
      alert("Date cannot be in the future, re enter the date.");
      isSubmit = false;
    }
    //generateReceipt(details.doctorName,details.patientName,details.slotNo,details.date,details.description);
    if (isSubmit) {
      const description = details.description.split("\n");
      for (let i = 0; i < description.length; i++) {
        const innerdescription = description[i].split(",");
        description[i] = innerdescription;
      }
      //console.log(description);
      try {
        const hash = await contract.methods
          .addReceipt(
            details.patientName,
            details.doctorId,
            details.pharmaId,
            description,
            details.date
          )
          .send({ from: account });
        //console.log(hash);
        alert("Receipt added successfully !");
      } catch (error) {
        alert('Enter all the details');
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
    <div style={{display:"flex",flexDirection:"row"}}>
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
              type="text"
              placeholder="Enter Doctor id"
              onChange={onChange}
              name="doctorId"
              value={details.doctorId}
            />
          </div>
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Doctor name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Doctor name"
              onChange={onChange}
              name="doctorName"
              value={details.doctorName}
            />
          </div>
        </Form.Group>
        <Form.Group
          style={{ display: "flex", flexDirection: "row" }}
          className="mb-3"
          controlId="pharmacist_Details"
        >
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Pharmacist id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Pharma id"
              onChange={onChange}
              name="pharmaId"
              value={details.pharmaId}
            />
          </div>
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Pharmacist name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Pharma name"
              onChange={onChange}
              name="pharmaName"
              value={details.pharmaName}
            />
          </div>
        </Form.Group>
        <Form.Group
          style={{ display: "flex", flexDirection: "row" }}
          className="mb-3"
          controlId="patient_Details"
        >
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Patient id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Patient id"
              onChange={onChange}
              name="patientId"
              value={details.patientId}
            />
          </div>
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
        <Form.Group
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
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date in dd-mm-yyyy"
              onChange={onChange}
              name="date"
              value={details.date}
            />
          </div>
        </Form.Group>
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
      <div style={{position:"absolute", left:"700px"}}>
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
                {doctors.map((ele,i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
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
