import React ,{useState,useContext, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import userContext from "../../context/users/userContext";
export const BookAppointment = () => {
  const [details, setDetails] = useState({doctorName:"", patientName:"", slotNo:"", date:""});
  const [doctors, setDoctors] = useState([]);
  const context = useContext(userContext);
  const {bookAppointment} = context;
  useEffect(() => {
    async function getAllDoctors(){
      const resp = await fetch('http://localhost:5000/api/auth/doctor/getalldoctors',{
        method:'GET'
      })

      const doctorArray = await resp.json();
      console.log(doctorArray)
      setDoctors(doctorArray)
    }

    getAllDoctors();
  },[doctors])
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    const isDateValid = dateValidation();
    console.log(isDateValid);
    if(!isDateValid){
      alert("Date cannot be in the past.")
    }
    //check if slot is available 
    //GET DOC ID BEFORE SENDING
    bookAppointment(details.patientName,details.doctorName, details.slotNo, details.date);
    //send data to blockchain if available else raise alert
  }
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const dateValidation = () => {
    var now = new Date();
    console.log(now.toJSON().slice(0, 10))
    if(details.date<= now.toJSON().slice(0, 10)){
      return false;
    }
    return true;
  }
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
