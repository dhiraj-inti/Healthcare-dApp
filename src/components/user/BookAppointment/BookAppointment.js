import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//IMPORT CSS STYLESHEET HERE
export const BookAppointment = () => {
  return (
    <>
      <h1>Book an Appointment</h1>
      <br></br>
      <Form style={{ display: "flex", flexDirection: "column" }}>
        <Form.Group
          style={{ display: "flex", flexDirection: "row" }}
          className="mb-3"
          controlId="doctor_patient_Details"
        >
          <div style={{marginRight:"30px"}}>
            <Form.Label>Doctor name</Form.Label>
            <Form.Control type="text" placeholder="Enter Doctor name" />
          </div>
          <div style={{marginRight:"30px"}}>
          <Form.Label>Patient name</Form.Label>
          <Form.Control type="text" placeholder="Enter Patient name" />
          </div>
        </Form.Group>
        <Form.Group
          style={{ display: "flex", flexDirection: "row" }}
          className="mb-3"
          controlId="slotDetails"
        >
          <div style={{marginRight:"30px"}}>
          <Form.Label>Slot number</Form.Label>
          <Form.Control type="text" placeholder="Enter Slot number" />
          </div>
          <div style={{marginRight:"30px"}}>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="Enter date in dd-mm-yyyy" />
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
