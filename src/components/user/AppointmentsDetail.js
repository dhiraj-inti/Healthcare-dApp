import React, { useEffect,useState } from "react"

const AppointmentsDetail = (props) => {
    const [res,setRes] = useState([])
    useEffect(()=>{
        async function init(){
            let x = await props.contract.methods.getAllAppointments().call();
            setRes(x);
        }
        init();
    },[])
    //console.log(res)
    return (
        <div>
            <h1>Appointments Details</h1>
            <table className="table table-info table-hover table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sender Address</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Doctor Name</th>
                        {props.type==="admin" && <th scope="col">Doctor ID</th>}
                        <th scope="col">Slot Number</th>
                        <th scope="col">Date</th>
                        <th scope="col">Timestamp</th>
                    </tr>
                </thead>
                <tbody className="table-hover"> 
                {res.map((ele,i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{ele.sender}</td>
                            <td>{ele.patient}</td>
                            <td>{ele.doctor}</td>
                            {props.type==="admin" && <td scope="col">{ele.doctorNo}</td>}
                            <td>{ele.slotNo}</td>
                            <td>{ele.date}</td>
                            <td>{ele.timestamp}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentsDetail;