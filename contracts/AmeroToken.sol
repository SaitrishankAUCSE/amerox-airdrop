// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "Addition overflow");
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "Subtraction overflow");
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "Multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "Division by zero");
        return a / b;
    }
}

contract AmeroToken {
    using SafeMath for uint256;

    // Token details
    string public constant name = "AMERO X";
    string public constant symbol = "AMX";
    uint8  public constant decimals = 18;

    // Supply constants (from your image)
    uint256 public constant TOTAL_SUPPLY = 333_333_333 * 10**18;
    
    uint256 public constant AIRDROP_SUPPLY = 33_333_333 * 10**18; // 10%
    
    uint256 public constant AIRDROP_AMOUNT = 333 * 10**18; // per user

    address public owner;
    uint256 public totalSupply;
    uint256 public totalAirdropped;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public airdropClaimed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        owner = msg.sender;

        // use MUL
        totalSupply = uint256(333_333_333).mul(10**uint256(decimals));

        balanceOf[owner] = totalSupply;
        emit Transfer(address(0), owner, totalSupply);
    }

    // ERC20 transfer (uses SUB + ADD)
    function transfer(address to, uint256 value) external returns (bool) {
        require(to != address(0), "Invalid address");

        balanceOf[msg.sender] = balanceOf[msg.sender].sub(value);
        balanceOf[to] = balanceOf[to].add(value);

        emit Transfer(msg.sender, to, value);
        return true;
    }

    // ERC20 approve
    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    // ERC20 transferFrom (uses SUB + ADD)
    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        allowance[from][msg.sender] = allowance[from][msg.sender].sub(value);
        balanceOf[from] = balanceOf[from].sub(value);
        balanceOf[to] = balanceOf[to].add(value);

        emit Transfer(from, to, value);
        return true;
    }

    // Airdrop (uses ADD, SUB, DIV)
    function claimAirdrop() external returns (bool) {
        require(!airdropClaimed[msg.sender], "Already claimed");

        // ensure total airdrop never exceeds 10%
        uint256 maxAirdrops = AIRDROP_SUPPLY.div(AIRDROP_AMOUNT);
        uint256 claimedSoFar = totalAirdropped.div(AIRDROP_AMOUNT);
        require(claimedSoFar < maxAirdrops, "Airdrop finished");

        airdropClaimed[msg.sender] = true;

        balanceOf[owner] = balanceOf[owner].sub(AIRDROP_AMOUNT);
        balanceOf[msg.sender] = balanceOf[msg.sender].add(AIRDROP_AMOUNT);

        totalAirdropped = totalAirdropped.add(AIRDROP_AMOUNT);

        emit Transfer(owner, msg.sender, AIRDROP_AMOUNT);
        return true;
    }
}