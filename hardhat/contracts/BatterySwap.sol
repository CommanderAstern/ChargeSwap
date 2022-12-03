// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Counters.sol";
/**
 * @title EV Battery Station
 */
contract BatterySwap {
    
    using Counters for Counters.Counter;

    enum Status {
        Idle,
        InUse, 
        Reserved,
        Broken
    }

    struct Battery {
        uint id;
        uint256 batteryPercentage;
        uint256 lastBlocktimeQueried;
        Status status;
        uint256 currentStation;
        address currentUser;
        string metaAbi; 
    }
    
    Battery[] public batteries;  
    Counters.Counter private _batteryIds;  
    mapping(string => uint) public rfidToBattery;
    
    uint blocksPerReduceCharge = 50;
    uint public ethPerCharge = 1 ether/ 100;
    
    function addNewBatteryToStation(uint256 _currentStation, string memory _metaAbi, string memory _rfid) public {
        uint256 newBatteryId = _batteryIds.current();
        Battery memory newBattery = Battery({
            id: newBatteryId,
            batteryPercentage: 100,
            lastBlocktimeQueried: block.timestamp,
            status: Status.Idle,
            currentStation: _currentStation,
            currentUser: address(0),
            metaAbi: _metaAbi
        });
        batteries.push(newBattery);
        rfidToBattery[_rfid] = newBatteryId;
        _batteryIds.increment();
    }

    function addNewBatteryToUser(address _user, string memory _metaAbi, string memory _rfid) public payable {
        require(msg.value >= (100 * ethPerCharge), "Not enough ETH sent to charge battery");
        uint256 newBatteryId = _batteryIds.current();
        Battery memory newBattery = Battery({
            id: newBatteryId,
            batteryPercentage: 100,
            lastBlocktimeQueried: block.timestamp,
            status: Status.InUse,
            currentStation: 0,
            currentUser: _user,
            metaAbi: _metaAbi
        });   
        batteries.push(newBattery);
        rfidToBattery[_rfid] = newBatteryId;
        _batteryIds.increment();
    }

    function getBatteryById(uint _batteryId) public view returns (Battery memory) {
        return batteries[_batteryId];
    }

    function getBatteryPercentage(uint _batteryId) public view   returns (uint256) {        
        uint blocksSinceLastQuery = block.timestamp - batteries[_batteryId].lastBlocktimeQueried;
        if (batteries[_batteryId].batteryPercentage - (blocksSinceLastQuery / blocksPerReduceCharge) > 0) {
            return batteries[_batteryId].batteryPercentage - (blocksSinceLastQuery / blocksPerReduceCharge);
        }
        return 0;
    }

    function getBatteryStatus(uint _batteryId) public view returns (Status) {
        return batteries[_batteryId].status; 
    }

    function getBatteryCurrentStation(uint _batteryId) public view returns (uint) {
        require(getBatteryStatus(_batteryId) == Status.Idle, "Battery is not in station");
        return batteries[_batteryId].currentStation; 
    }

    function getBatteryCurrentUser(uint _batteryId) public view returns (address) {
        require(getBatteryStatus(_batteryId) == Status.InUse, "Battery is not in use");
        return batteries[_batteryId].currentUser; 
    }

    function getBatteriesByUser(address _user) public view returns (uint[] memory) {
        uint[] memory userBatteries = new uint[](_batteryIds.current());
        uint counter = 0;
        for (uint i = 0; i < batteries.length; i++) {
            if (batteries[i].currentUser == _user) {
                userBatteries[counter] = batteries[i].id;
                counter++;
            }
        }
        
        uint[] memory correctSizeArray = new uint[](counter);
        for (uint i = 0; i < counter; i++) {
            correctSizeArray[i] = userBatteries[i];
        }
        return correctSizeArray;
    }

    function getBatteriesByStation(uint _stationId) public view returns (uint[] memory) {
        uint[] memory stationBatteries = new uint[](_batteryIds.current());
        uint counter = 0;
        for (uint i = 0; i < batteries.length; i++) {
            if (batteries[i].currentStation == _stationId) {
                stationBatteries[counter] = batteries[i].id;
                counter++;
            }
        }

        uint[] memory correctSizeArray = new uint[](counter);
        for (uint i = 0; i < counter; i++) {
            correctSizeArray[i] = stationBatteries[i];
        }
        return correctSizeArray;
    }

    function totalCostForUser(address _user) public view returns(uint) {
        uint[] memory userBatteries = getBatteriesByUser(_user);

        uint totalcost = 0;
        for (uint i = 0; i < userBatteries.length; i++) {
            totalcost += (100 - getBatteryPercentage(userBatteries[i])) * ethPerCharge;
        }

        return totalcost;
    }
    function swapAllBatteries(uint _stationId) public payable {
        uint[] memory userBatteries = getBatteriesByUser(msg.sender);
        require(userBatteries.length > 0, "User has no batteries");

        uint[] memory batteriesForSwapping = getBatteriesByStation(_stationId);
        require(batteriesForSwapping.length >= userBatteries.length, "Not enough batteries available");

        uint totalcost = 0;
        for (uint i = 0; i < userBatteries.length; i++) {
            totalcost += (100 - getBatteryPercentage(userBatteries[i])) * ethPerCharge;
        }
        require(msg.value >= totalcost, "Not enough funds to swap batteries");


        for (uint i = 0; i < userBatteries.length; i++) {
            batteries[userBatteries[i]].status = Status.Idle;
            batteries[userBatteries[i]].currentStation = _stationId;
            batteries[userBatteries[i]].currentUser = address(0);
        }

        for (uint i = 0; i < userBatteries.length; i++) {
            batteries[batteriesForSwapping[i]].status = Status.InUse;
            // batteries[batteriesForSwapping[i]].currentStation = 0;
            batteries[batteriesForSwapping[i]].currentUser = msg.sender;
        }
    }

    //only owner
    function updateEthPerCharge(uint _newEthPerCharge) public {
        ethPerCharge = _newEthPerCharge;
    }
}