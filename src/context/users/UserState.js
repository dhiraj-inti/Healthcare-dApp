import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const host = "http://localhost:5000";
    // const host = "http://172.20.10.4:5000";
    const [user, setUser] = useState(null);
    const [myAppointments, setMyAppointments] = useState([])

    const login = async (email, password) => {
        const response = await fetch(`${host}/api/auth/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const res = await response.json();

        return res;
    }

    const getUser = async (authToken) => {
        const response = await fetch(`${host}/api/auth/user/getuser`, {
            method: 'POST',
            headers: {
                'auth-token': authToken
            }
        });

        const res = await response.json();
        res.dob = (new Date(res.dob)).toLocaleDateString()
        setUser(res);
        return res;
    }

    const bookAppointment = async (patientName, doctorId, doctorName, slotNo, date) => {
        const response = await fetch(`${host}/api/appointment/user/bookappointment`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patientName, doctorId, doctorName, slotNo, date })
        });

        const res = await response.json();
        const user = await getUser(localStorage.getItem('token'));
        setMyAppointments(user.appointmentsBooked);
        return res;
    }

    const signup = async (name, email, password, dob, address, phoneNumber, ipfsPath) => {
        const response = await fetch(`${host}/api/auth/user/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, dob, address, phoneNumber, ipfsPath })
        });
        const res = await response.json();
        return res;
    }

    const getIpfsPath = async (name, filename, chronicConditions, medicalAllergies) => {
        const response = await fetch(`${host}/uploadfile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, filename, chronicConditions, medicalAllergies })
        });

        const res = await response.json();
        return res;
    }

    return (
        <UserContext.Provider value={{ user, myAppointments, login, getUser, bookAppointment, signup, getIpfsPath }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;