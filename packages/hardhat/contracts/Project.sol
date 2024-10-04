// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./User.sol";  // Import UserRegistry to access admin roles

contract Project {

    enum Category { Donation, Crowdfund }
    enum Status { Pending, Verified, Rejected }

    struct ProjectDetails {
        string name;
        string overview;
        Category category;
        string subCategory; 
        uint256 fundingGoal;
        uint256 currentFunds;
        address payable creator;
        Status status;
        bool isActive;
    }

    struct ProjectSummary {
        uint256 projectId;
        string name;
        Status status;
    }

    // UserRegistry contract instance
    UserRegistry private userRegistry;

    // Mapping of creator's wallet address to their projects
    mapping(address => mapping(uint256 => ProjectDetails)) public userProjects;
    mapping(address => uint256) public projectCount;

    event ProjectCreated(
        address indexed creator,
        uint256 indexed projectId,
        string name,
        string overview,
        Category category,
        string subCategory,
        uint256 fundingGoal
    );

    event ProjectStatusChanged(
        uint256 indexed projectId,
        Status newStatus
    );

    event FundsDonated(address indexed creator, uint256 indexed projectId, address indexed donor, uint256 amount);

    constructor(address _userRegistryAddress) {
        // Initialize the UserRegistry contract instance
        userRegistry = UserRegistry(_userRegistryAddress);
    }

    function createProject(
        string memory _name,
        string memory _overview,
        Category _category,
        string memory _subCategory,
        uint256 _fundingGoal
    ) public {
        require(_fundingGoal > 0, "Funding goal must be greater than 0");

        projectCount[msg.sender]++;
        uint256 newProjectId = projectCount[msg.sender];

        userProjects[msg.sender][newProjectId] = ProjectDetails({
            name: _name,
            overview: _overview,
            category: _category,
            subCategory: _subCategory,
            fundingGoal: _fundingGoal,
            currentFunds: 0,
            creator: payable(msg.sender),
            status: Status.Pending,
            isActive: true
        });

        emit ProjectCreated(
            msg.sender,
            newProjectId,
            _name,
            _overview,
            _category,
            _subCategory,
            _fundingGoal
        );
    }

    function donateToProject(address _creator, uint256 _projectId) public payable {
        ProjectDetails storage project = userProjects[_creator][_projectId];
        require(project.isActive, "Project is not active");
        require(msg.value > 0, "Donation amount must be greater than 0");
        require(project.creator != address(0), "Project does not exist");
        require(project.status == Status.Verified, "Project must be verified to receive funds");

        project.currentFunds += msg.value;
        emit FundsDonated(_creator, _projectId, msg.sender, msg.value);

        if (project.currentFunds >= project.fundingGoal) {
            project.isActive = false;
        }

        project.creator.transfer(msg.value);
    }

    // Only admins from UserRegistry can change the status of the project
    function changeProjectStatus(address _creator, uint256 _projectId, Status _newStatus) public {
        require(userRegistry.isAdmin(msg.sender), "Caller is not an admin");
        ProjectDetails storage project = userProjects[_creator][_projectId];
        require(project.creator != address(0), "Project does not exist");

        project.status = _newStatus;

        emit ProjectStatusChanged(_projectId, _newStatus);
    }

    function getProjects(address _creator) public view returns (ProjectSummary[] memory) {
        uint256 count = projectCount[_creator];
        require(count > 0, "No projects found for this address");

        ProjectSummary[] memory allProjectSummaries = new ProjectSummary[](count);

        for (uint256 i = 1; i <= count; i++) {
            ProjectDetails storage project = userProjects[_creator][i];
            allProjectSummaries[i - 1] = ProjectSummary({
                projectId: i,
                name: project.name,
                status: project.status
            });
        }

        return allProjectSummaries;
    }

    function deactivateProject(address _creator, uint256 _projectId) public {
        ProjectDetails storage project = userProjects[_creator][_projectId];
        require(project.creator != address(0), "Project does not exist");
        require(msg.sender == project.creator || userRegistry.isAdmin(msg.sender), "Only the project creator or admin can deactivate the project");
        project.isActive = false;
    }

    receive() external payable {
        revert("Use the donateToProject function to donate.");
    }
}

