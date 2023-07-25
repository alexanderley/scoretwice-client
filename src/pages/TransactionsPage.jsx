import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../apiKey";

const TransactionsPage = () => {
  const { id: senderIdFromURL } = useParams();
  const [amount, setAmount] = useState();
  const [transferMessage, setTransferMessage] = useState();
  const [receiverOptions, setReceiverOptions] = useState([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState("");
  const [senderId, setSenderId] = useState(senderIdFromURL);
  const [userTransactions, setUserTransactions] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransferMessageChange = (e) => {
    setTransferMessage(e.target.value);
  };

  const handleReceiverChange = (e) => {
    setSelectedReceiverId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${API_URL}/api/users/${senderId}/transactions/${selectedReceiverId}`,
        {
          amount,
          transferMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Transaction successful:", response.data);
        // Fetch the user's transactions after successful transaction
        fetchUserTransactions();
      })
      .catch((error) => {
        console.error("Error making a new transaction:", error);
      });
  };

  const fetchUserTransactions = () => {
    axios
      .get(`${API_URL}/api/users/${senderId}/transactions`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setUserTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  useEffect(() => {
    // Fetch the user's transactions when the component mounts
    fetchUserTransactions();

    axios
      .get(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        const users = response.data;
        const options = users.map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user._id,
        }));
        setReceiverOptions(options);
        const loggedInUser = users.find((user) => user.isLoggedIn);
        if (loggedInUser) {
          setSenderId(loggedInUser._id);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [storedToken]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Sender ID:
          <input type="text" value={senderId} readOnly />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} placeholder="Enter amount in €"/>
        </label>
        <label>
          Bank purpose:
          <input
            type="text"
            value={transferMessage}
            onChange={handleTransferMessageChange}
            placeholder="Enter the purpose of the transaction"
          />
        </label>
        <label>
          Receiver:
          <select value={selectedReceiverId} onChange={handleReceiverChange}>
            <option value="">Select Receiver</option>
            {receiverOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Make Transaction</button>
      </form>

      <div>
        <h2>User Transactions</h2>
        {userTransactions.length > 0 ? (
          <ul>
            {userTransactions.map((transaction) => (
              <li key={transaction._id}>
                {transaction.sender === senderId ? (
                  <>
                    <strong>You</strong> sent: {transaction.amount} to{" "}
                    {transaction.receiver}
                  </>
                ) : (
                  <>
                    <strong>{transaction.sender}</strong> sent:{" "}
                    {transaction.amount} to you
                  </>
                )}
                <br />
                Transfer Message: {transaction.transferMessage}
                <br />
                {/* Add any other fields you want to display */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found for the user.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
