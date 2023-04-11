import React from "react"

export const DrugInventoryDetail = (props) => {
    const drugRes = props.drugRes;
    return (
        <div>
            <h1>Drug Inventory Details</h1>
            <table className="table table-info table-hover table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Doctor ID</th>
                        <th scope="col">Pharmacist ID</th>
                        <th scope="col">Medicines</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody className="table-hover">
                    {drugRes.map((ele, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{ele.patientName}</td>
                                <td>{ele.doctorId}</td>
                                <td>{ele.pharmaId}</td>
                                <td>{ele.medicines.map((item,j)=>{
                                    return(
                                        <p key={ele.timestamp + j}>{item[0]} - {item[1]}</p>
                                    )
                                })}</td>
                                <td>{ele.date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}