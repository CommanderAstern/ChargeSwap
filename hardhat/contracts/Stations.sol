// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Counters.sol";

contract Stations {
    
    using Counters for Counters.Counter;

    struct Station {
        uint id;
        string location;
        string latitude;
        string longitude;
        bool isActive;
        bool isRenewable;
    }

    Station[] public stations;
    Counters.Counter private _stationIds;

    // only owner
    function addNewStation(string memory _location, string memory _latitude, string memory _longitude, bool _isActive, bool _isRenewable) public {
        uint256 newStationId = _stationIds.current();
        Station memory newStation = Station({
            id: newStationId,
            location: _location,
            latitude: _latitude,
            longitude: _longitude,
            isActive: _isActive,
            isRenewable: _isRenewable
        });
        stations.push(newStation);
        _stationIds.increment();
    }

    function getAllStations() public view returns (Station[] memory) {
        return stations;
    }

    // only owner
    function getStation(uint _id) public view returns (Station memory) {
        return stations[_id];
    }

    // only owner
    function toggleStationActivity(uint _id) public {
        stations[_id].isActive = !stations[_id].isActive;
    }
}