import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const host = "http://localhost:5000";
    const [user, setUser] = useState(null);
    const [myAppointments, setMyAppointments] = useState([])

    const login = async (email, password) => {
        const response = await fetch(`${host}/api/auth/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        localStorage.setItem('token',response.authtoken);
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
        setUser(res);
        return res;
    }

    const bookAppointment = async(patientName, doctorId, doctorName, slotNo, date) => {
        const response = await fetch(`${host}/api/auth/user/login`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({patientName, doctorId, doctorName, slotNo, date})
        });

        const res = await response.json();
        const user = await getUser(localStorage.getItem('token'));
        setMyAppointments(user.appointmentsBooked);
        return res;
    }

    return (
        <UserContext.Provider value={{ user, myAppointments, login, getUser,bookAppointment }}>
          {props.children}
        </UserContext.Provider>
    )
}

export default UserState;