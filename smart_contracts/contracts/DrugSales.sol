// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DrugSales{
    uint256 salesCounter;

    struct Receipt{
        string patient;
        string doctor;
        string pharmacist;
        string[][] medicines;
        uint256 timestamp;
    }

    Receipt[] receipts;
    event generateReceipt(string patient, string doctor, string pharmacist, string[][] medicines, uint256 timestamp);

    function addToBlockchain(string memory patient,string memory doctor, string memory pharmacist, string[][] memory medicines) public {
        salesCounter+=1;
        receipts.push(Receipt(patient, doctor, pharmacist, medicines, block.timestamp));

        emit generateReceipt(patient, doctor, pharmacist, medicines, block.timestamp);
    }

    function getAllReceipts() public view returns (Receipt[] memory) {
        return receipts;
    } 

    function getReceiptsCount() public view returns (uint256){
        return salesCounter;
    }
}