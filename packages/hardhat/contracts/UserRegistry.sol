// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract UserRegistry is AccessControl {
    struct User {
        string username;
        string email;
        uint256 lastUpdated;
    }

    mapping (address => User) private users;

    // Define roles
    bytes32 public constant DEFAULT_ROLE = keccak256("DEFAULT_ROLE");

    // Total user count
    uint256 private total_user_count;

    // Event for user registration
    event UserRegistered(address indexed walletAddress, string username, string email);

    constructor() {
        // Grant the deployer the admin role and register the user
        string memory admin_user_name = "FundHive Admin";
        string memory admin_email = "abdullahafzal123@gmail.com";

        users[msg.sender] = User({
            username: admin_user_name,
            email: admin_email,
            lastUpdated: block.timestamp
        });
        
        // DEFAULT_ADMIN_ROLE IS THE DEFAULT ROLE FROM OPENZEPPELIN ACCESS CONTROL LIBRARY
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        total_user_count++;

        emit UserRegistered(msg.sender, admin_user_name, admin_email);
    }

    function registerUser(address walletAddress, string memory _username, string memory _email) external {
        require(walletAddress != address(0), "Invalid wallet address");
        require(bytes(users[walletAddress].username).length == 0, "User already registered");

        users[walletAddress] = User({
            username: _username,
            email: _email,
            lastUpdated: block.timestamp
        });

        // Grant the DEFAULT role to the target address
        _grantRole(DEFAULT_ROLE, walletAddress);
        total_user_count++;

        emit UserRegistered(walletAddress, _username, _email);
    }


    // Function to get the total number of users
    function getTotalUsers() external view returns (uint256) {
        return total_user_count;
    }

    function isUserExist(address walletAddress) external view returns (bool) {
        return bytes(users[walletAddress].username).length > 0;
    }

    // Function to check if a user is an admin
    function isAdmin(address walletAddress) external view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, walletAddress);
    }

    function getEmail(address walletAddress) external view returns (string memory) {
        require(bytes(users[walletAddress].username).length > 0, "User does not exist");
        return users[walletAddress].email;
    }

    function getName(address walletAddress) external view returns (string memory) {
        require(bytes(users[walletAddress].username).length > 0, "User does not exist");
        return users[walletAddress].username;
    }
}