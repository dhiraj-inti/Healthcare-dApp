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

    struct Medicine {
        address sender;
        uint256 rfid;
        uint lotNo;
        string medName;
        uint qty;
        uint ppu;
        string manufacturer;
        string expiryDate;
        uint256 blockNo;
        uint256 timestamp;
    }

    event addMedicine(
        address sender,
        uint256 rfid,
        uint lotNo,
        string medName,
        uint qty,
        uint ppu,
        string manufacturer,
        string expiryDate,
        uint256 blockNo,
        uint256 timestamp
    );

    Medicine[] medicines;

    function addReceipt(
        string memory pname,
        uint256 docid,
        uint256 phid,
        string[][] memory _medicines,
        string memory date
    ) public {
        bool found = false;
        for (uint i = 0; i < medicines.length; i++) {
            for(uint j=0; j<_medicines.length; j++) {
                if(medicines[i].rfid == stringToUint(_medicines[j][0])){
                    require(medicines[i].qty >= stringToUint(_medicines[j][1]),"Insufficient quantity available");
                    found = true;
                }
            }
        }
        require(found==true,"Medicine not found");
        receipts.push(Receipt(pname, docid, phid, _medicines, date, block.timestamp));
        receiptsGenerated += 1;
        emit generateReceipt(pname, docid, phid, _medicines, date, block.timestamp);
    }

    function stringToUint(string memory s) public pure returns (uint) {
        bytes memory b = bytes(s);
        uint result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            uint256 c = uint256(uint8(b[i]));
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
        return result;
    }

    function pushMedicine(uint256 rfid,uint lotNo,string memory medName,uint qty, uint ppu,string memory manufacturer,string memory expiryDate) public{
        medicines.push(Medicine(msg.sender,rfid,lotNo,medName,qty,ppu,manufacturer,expiryDate,block.number,block.timestamp));
        emit addMedicine(msg.sender,rfid, lotNo, medName, qty, ppu, manufacturer, expiryDate, block.number, block.timestamp);
    }

    function getAllMedicines() public view returns (Medicine[] memory) {
        return medicines;
    }

    function getAllReceipts() public view returns (Receipt[] memory) {
        return receipts;
    }

    function getReceiptsCount() public view returns (uint256) {
        return receiptsGenerated;
    }
}
