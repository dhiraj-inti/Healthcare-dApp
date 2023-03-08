// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Appointments {

    uint256 bookingsCounter;
    bool[][] slotsFilled;
    uint doctorsCount;
    uint slotsCount;
    struct Appointment {
        string patient;
        string doctor;
        uint slotNo;
        uint256 timestamp;
    }

    event bookAppointment(string patient, string doctor, uint doctorNo, uint slotNo, uint256 timestamp);

    Appointment[] appointments;

    function setDoctorsAndSlots(uint noOfDoctors, uint noOfSlots) public{
        doctorsCount = noOfDoctors;
        slotsCount = noOfSlots;
        slotsFilled = new bool[][](noOfDoctors);
        for (uint i = 0; i < noOfDoctors; i++) {
            slotsFilled[i] = new bool[](noOfSlots);
            for (uint j = 0; j < noOfSlots; j++) {
                slotsFilled[i][j] = false;
            }
        }
    }

    function addToBlockchain(string memory patient,string memory doctor, uint doctorNo, uint slotNo) public {
        require(slotNo<slotsCount && slotNo > 0,"Invalid slot number");
        require(doctorNo<doctorsCount && doctorNo > 0,"Invalid doctor number");
        require(slotsFilled[doctorNo-1][slotNo-1]==false,"Slot already filled");
        bookingsCounter+=1;
        slotsFilled[doctorNo-1][slotNo-1]=true;
        appointments.push(Appointment(patient, doctor, slotNo, block.timestamp));

        emit bookAppointment(patient, doctor, doctorNo, slotNo, block.timestamp);
    } 

    function getAllAppointments() public view returns (Appointment[] memory) {
        return appointments;
    } 

    function getAppointmentsCount() public view returns (uint256) {
        return bookingsCounter;
    } 

}