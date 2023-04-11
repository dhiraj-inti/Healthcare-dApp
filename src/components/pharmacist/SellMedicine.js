import React , {useState,useContext} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PharmacistContext from "../../context/pharmscists/pharmacistContext";

export const SellMedicine = () => {
  const [details, setDetails] = useState({doctorName:"", patientName:"", slotNo:"", date:"",description:""});
  const context = useContext(PharmacistContext)
  const {generateReceipt} = context;
  const onChange = (e) =>{
    setDetails({...details,[e.target.name]:e.target.value})
    console.log(details)
  }
  const onSubmit = (e) =>{
    e.preventDefault();
    console.log(details);
    const isDateValid = dateValidation();
    if(!isDateValid){
      alert("Date cannot be in the future.")
    }
    generateReceipt(details.doctorName,details.patientName,details.slotNo,details.date,details.description);
  

  }
  const dateValidation = () => {
    var now = new Date();
    if(details.date>now.toJSON().slice(0, 10)){
      return false;
    }
    return true;
  }
  return (
    <>
      <h2>Enter Receipt Details</h2>
      <br></br>
      <Form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <Form.Group
          style={{ display: "flex", flexDirection: "row" }}
          className="mb-3"
          controlId="doctor_patient_Details"
        >
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Doctor name</Form.Label>
            <Form.Control type="text" placeholder="Enter Doctor name" onChange={onChange} name="doctorName" value={details.doctorName} />
          </div>
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Patient name</Form.Label>
            <Form.Control type="text" placeholder="Enter Patient name" onChange={onChange} name="patientName" value={details.patientName}/>
          </div>
        </Form.Group>
        <Form.Group
          style={{ display: "flex", flexDirection: "row" }}
          className="mb-3"
          controlId="slotDetails"
        >
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Slot number</Form.Label>
            <Form.Control type="text" placeholder="Enter Slot number" onChange={onChange} name="slotNo" value={details.slotNo}/>
          </div>
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="Enter date in dd-mm-yyyy" onChange={onChange} name="date" value={details.date}/>
          </div>
        </Form.Group>
        <Form.Group>
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Enter Description</Form.Label>
            <br></br>
            <textarea style={{width:"450px", height:"200px"}} placeholder="Enter description" onChange={onChange} name="description" value={details.description}/>
          </div>
        </Form.Group>
        <div style={{ marginRight: "30px" }}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};
