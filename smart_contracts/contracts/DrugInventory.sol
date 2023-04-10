// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DrugInventory {
    uint256 receiptsGenerated;
    struct Receipt {
        string patientName;
        uint256 doctorId;
        uint256 pharmaId;
        string[][] medicines;
        uint256 timestamp;
    }
    event generateReceipt(
        string patientName,
        uint256 doctorId,
        uint256 pharmaId,
        string[][] medicines,
        uint256 timestamp
    );
    Receipt[] public receipts;

    function addReceipt(
        string memory pname,
        uint256 docid,
        uint256 phid,
        string[][] memory _medicines
    ) public {
        receipts.push(Receipt(pname, docid, phid, _medicines, block.timestamp));
        receiptsGenerated += 1;
        emit generateReceipt(pname, docid, phid, _medicines, block.timestamp);
    }

    function getAllReceipts() public view returns (Receipt[] memory) {
        return receipts;
    }

    function getReceiptsCount() public view returns (uint256) {
        return receiptsGenerated;
    }
}
