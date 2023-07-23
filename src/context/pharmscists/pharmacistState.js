import { useState } from "react";
import PharmacistContext from "./pharmacistContext";

const PharmacistState = (props) => {
    const host = "http://localhost:5000";
    // const host = "http://172.20.10.4:5000";
    const [pharmacist, setPharmacist] = useState(null);
    const [myReceipts, setMyReceipts] = useState([])

    const login = async (email, password) => {
        const response = await fetch(`${host}/api/auth/pharmacist/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const res = await response.json();
        return res;
    }

    const getPharmacist = async (pharmaToken) => {
        const response = await fetch(`${host}/api/auth/pharmacist/getpharmacist`, {
            method: 'POST',
            headers: {
                'auth-token': pharmaToken
            }
        });

        const res = await response.json();
        res.dob = (new Date(res.dob)).toLocaleDateString()
        setPharmacist(res);
        return res;
    }

    const generateReceipt = async (doctorId, doctorName, patientId, patientName, slotNo, date, description) => {
        const response = await fetch(`${host}/api/auth/pharmacist/sellprescription`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('pharmaToken')
            },
            body: JSON.stringify({ doctorId, doctorName, patientId, patientName, slotNo, date, description })
        })
        const res = await response.json();
        myReceipts.push(res.prescription);
        setMyReceipts(myReceipts);

        return res;
    }

    return (
        <PharmacistContext.Provider value={{ pharmacist, myReceipts, login, getPharmacist, generateReceipt }}>
            {props.children}
        </PharmacistContext.Provider>
    )
}

export default PharmacistState;