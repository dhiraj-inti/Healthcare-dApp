// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DrugInventory {
    uint256 receiptsGenerated;
    struct Receipt {
        string patientName;
        uint256 doctorId;
        uint256 pharmaId;
        string[][] medicines;
        string date;
        uint256 timestamp;
    }
    event generateReceipt(
        string patientName,
        uint256 doctorId,
        uint256 pharmaId,
        string[][] medicines,
        string date,
        uint256 timestamp
    );
    Receipt[] receipts;

    function addReceipt(
        string memory pname,
        uint256 docid,
        uint256 phid,
        string[][] memory _medicines,
        string memory date
    ) public {
        receipts.push(Receipt(pname, docid, phid, _medicines, date, block.timestamp));
        receiptsGenerated += 1;
        emit generateReceipt(pname, docid, phid, _medicines, date, block.timestamp);
    }

    function getAllReceipts() public view returns (Receipt[] memory) {
        return receipts;
    }

    function getReceiptsCount() public view returns (uint256) {
        return receiptsGenerated;
    }
}
