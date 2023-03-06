// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Appointments {
    uint256 bookingsCounter;
    struct Appointment {
        string patient;
        string doctor;
        uint slotNo;
        uint256 timestamp;
    }

    event bookAppointment(string patient, string doctor, uint slotNo, uint256 timestamp);

    Appointment[] appointments;

    function addToBlockchain(string memory patient,string memory doctor, uint slotNo) public {
        require(bookingsCounter<5);
        bookingsCounter+=1;
        appointments.push(Appointment(patient, doctor, slotNo, block.timestamp));

        emit bookAppointment(patient, doctor, slotNo, block.timestamp);
    } 

    function getAllAppointments() public view returns (Appointment[] memory) {
        return appointments;
    } 

    function getAppointmentsCount() public view returns (uint256) {
        return bookingsCounter;
    } 

}