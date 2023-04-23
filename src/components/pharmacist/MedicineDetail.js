import React, { useState, useEffect } from "react"
import Web3 from "web3"

export const MedicineDetail = (props) => {
    const [medRes, setMedRes] = useState([]);
    useEffect(() => {
        async function init() {
            console.log(props.contract)
            let x = await props.contract.methods.getAllMedicines().call();
            setMedRes(x);
        }
        init();
    }, [])
    return (
        <div>
            <h1>Medicine Details</h1>
            <table className="table table-info table-hover table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sender address</th>
                        <th scope="col">RFID</th>
                        <th scope="col">Lot No</th>
                        <th scope="col">Medicine</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price Per Unit</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Expiry Date</th>
                        <th scope="col">Block No</th>
                        <th scope="col">Timestamp</th>
                    </tr>
                </thead>
                <tbody className="table-hover">
                    {medRes.map((ele, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{ele.sender}</td>
                                <td>{ele.rfid}</td>
                                <td>{ele.lotNo}</td>
                                <td>{ele.medName}</td>
                                <td>{ele.qty}</td>
                                <td>{ele.ppu}</td>
                                <td>{ele.manufacturer}</td>
                                <td>{ele.expiryDate}</td>
                                <td>{ele.blockNo}</td>
                                <td>{ele.timestamp}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}