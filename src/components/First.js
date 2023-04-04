import React from "react"
import { Link, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
export const First = () => {
    const navigate = useNavigate(); 
    const userLogin = () => {
        navigate('/userlogin');
    };
    const pharmaLogin = () => {
        navigate('/pharmalogin');
    };
    const adminLogin = () => {
        navigate('/adminlogin');
    };
    return(
        <>
        <h2 style = {{justifyContent:"center",display:"flex"}}>Who are you ?</h2>
        <div style = {{justifyContent:"center",display:"flex"}}>
        <Button style = {{margin:"20px"}} variant="primary"  onClick = {userLogin}>Patient</Button>{' '}
        <Button style = {{margin:"20px"}} variant="secondary"  onClick = {pharmaLogin}>Pharmacist</Button>{' '}
        <Button style = {{margin:"20px"}} variant="success"  onClick = {adminLogin}>Admin</Button>{' '}
        </div>
        </>
    );
}