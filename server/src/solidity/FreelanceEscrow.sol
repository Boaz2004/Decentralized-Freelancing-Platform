// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FreelanceEscrow {
    address public client;
    address public freelancer;
    uint public amount;
    bool public workSubmitted;
    bool public workApproved;

    event PaymentDeposited(address client, uint amount);
    event WorkSubmitted(address freelancer);
    event WorkApproved(address client, uint amount);
    event DisputeRefunded(address client, uint amount);

    constructor(address _freelancer) payable {
        require(msg.value > 0, "Deposit required");
        client = msg.sender;
        freelancer = _freelancer;
        amount = msg.value;
        emit PaymentDeposited(client, msg.value);
    }

    function submitWork() public {
        require(msg.sender == freelancer, "Only freelancer can submit work");
        workSubmitted = true;
        emit WorkSubmitted(freelancer);
    }

    function approveWork() public {
        require(msg.sender == client, "Only client can approve work");
        require(workSubmitted, "Work not submitted yet");
        workApproved = true;
        payable(freelancer).transfer(amount);
        emit WorkApproved(client, amount);
    }

    function disputeRefund() public {
        require(msg.sender == client, "Only client can request refund");
        require(!workApproved, "Work already approved");
        payable(client).transfer(amount);
        emit DisputeRefunded(client, amount);
    }
}