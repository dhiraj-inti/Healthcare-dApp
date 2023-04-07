import React ,{useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export const BookAppointment = () => {
  const [details, setDetails] = useState({doctorName:"", patientName:"", slotNo:"", date:""});
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(details);
  }
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1>Book an Appointment</h1>
      <br></br>
      <Form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }} method="POST">
        <Form.Group
          style={{ display: "flex", flexDirection: "row" }}
          className="mb-3"
          controlId="doctor_patient_Details"
        >
          <div style={{marginRight:"30px"}}>
            <Form.Label>Doctor name</Form.Label>
            <Form.Control  onChange={onChange} type="text" placeholder="Enter Doctor name" name="doctorName" value = {details.doctorName}/>
          </div>
          <div style={{marginRight:"30px"}}>
          <Form.Label>Patient name</Form.Label>
          <Form.Control  onChange={onChange} type="text" placeholder="Enter Patient name" name="patientName" value = {details.patientName}/>
          </div>
        </Form.Group>
        <Form.Group
          style={{ display: "flex", flexDirection: "row" }}
          className="mb-3"
          controlId="slotDetails"
        >
          <div style={{marginRight:"30px"}}>
          <Form.Label>Slot number</Form.Label>
          <Form.Control  onChange={onChange} type="text" placeholder="Enter Slot number" name="slotNo" value = {details.slotNo}/>
          </div>
          <div style={{marginRight:"30px"}}>
          <Form.Label>Date</Form.Label>
          <Form.Control  onChange={onChange} type="date" placeholder="Enter date in dd-mm-yyyy" name="date" value={details.date}/>
          </div>
        </Form.Group>
        <div style={{marginRight:"30px"}}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </div>
      </Form>
    </>
  );
};
