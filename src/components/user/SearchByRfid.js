import React, { useState, useEffect } from "react"
import Web3 from "web3";

export const SearchByRfid = (props) => {
    const [medRes, setMedRes] = useState([]);
    const [med, setMed] = useState("1")
    const [rfid,setRfid] = useState("");
    let web3 = window.web3;
    const ethereum = window.ethereum;
    const [account,setacc] = useState([]);
    const contract = props.contract;
    useEffect(() => {
        async function loadBlockchainData() {
            web3 = new Web3(ethereum);
            let x = await web3.eth.getAccounts();
            setacc(x)
        }
        async function init() {
            console.log(contract)
            let x = await props.contract.methods.getAllMedicines().call();
            setMedRes(x);
        }
        init();
        loadBlockchainData();
    }, [])
    const handleSubmit = (e) =>{
        e.preventDefault();
        let found = false;
        for(let i=0;i<medRes.length;++i){
            if(medRes[i].rfid==rfid){
                setMed(medRes[i])
                found = true;
            }
        }

        if(!found){
            setMed("")
        }
    }
    const onChange = (e)=>{
        setRfid(e.target.value)
    }
    return(
        <div>
            <h1>Medicine Details</h1>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">RFID</label>
                    <input style={{width:"250px"}} type="text" className="form-control" value={rfid} onChange={onChange} id="rfid" name="rfid"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {med!=="" && med!=="1" && <table className="table table-info table-hover table-striped-columns">
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
                    
                    <tr key={100}>
                        <th scope="row">1</th>
                        <td>{med.sender}</td>
                        <td>{med.rfid}</td>
                        <td>{med.lotNo}</td>
                        <td>{med.medName}</td>
                        <td>{med.qty}</td>
                        <td>{med.ppu}</td>
                        <td>{med.manufacturer}</td>
                        <td>{med.expiryDate}</td>
                        <td>{med.blockNo}</td>
                        <td>{med.timestamp}</td>
                    </tr>
                        
                </tbody>
            </table>}
            {med==="1" && ""}
            {med==="" && "No results found!"}
        </div>
    );
}