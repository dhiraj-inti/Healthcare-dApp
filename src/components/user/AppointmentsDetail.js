import React from "react"

const AppointmentsDetail = (props) => {
    const res = props.res;
    console.log(res)
    return (
        <div>
            <h1>Appointments Details</h1>
            <table className="table table-info table-hover table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Slot Number</th>
                        <th scope="col">Timestamp</th>
                    </tr>
                </thead>
                <tbody className="table-hover"> 
                {res.map((ele,i) => {
                    return (
                        <tr>
                            <th scope="row">{i+1}</th>
                            <td>{ele.patient}</td>
                            <td>{ele.doctor}</td>
                            <td>{ele.slotNo}</td>
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