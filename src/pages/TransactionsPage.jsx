import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../apiKey";
import styles from "../pages/TransactionPage.css";
import Footer from "../ui/Footer";

const TransactionsPage = () => {
  const { id: senderIdFromURL } = useParams();
  const [amount, setAmount] = useState("");
  const [transferMessage, setTransferMessage] = useState("");
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
    <div >
    <div className="bottomMargin">
      <form onSubmit={handleSubmit} className="cardContainer">
      <div >
        <label className="formContainerLabel">
          Sender ID:<br></br>
          <input type="text" value={senderId} readOnly   className="formContainerInput"/>
        </label>
        <label className="formContainerLabel">
          Amount:
          <br></br>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount in €"
            className="formContainerInput"
          />
        </label>
        <label className="formContainerLabel">
          Bank purpose:<br></br>
          <input
            type="text"
            value={transferMessage}
            onChange={handleTransferMessageChange}
            placeholder="Enter the purpose of the transaction"
            className="formContainerInput"
          />
        </label>
        <label className="formContainerLabel">
          Receiver:
          <select value={selectedReceiverId} onChange={handleReceiverChange}   className="formContainerInput">
            <option value="">Select Receiver</option>
            {receiverOptions.map((option) => (
              <option key={option.value} value={option.value} >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        </div><br></br>
        <button className="buttonRedNew" type="submit">
          Make Transaction
        </button>
      </form>








      <div>
  {userTransactions.length > 0 ? (
    <ul className="cardContainerInvisible">
      <h3 className="h3Class">Your transactions:</h3>
      {userTransactions.map((transaction) => (
        <li className="cardContainerTransactions" key={transaction._id}>
          {transaction.sender === senderId ? (
            <>
           
              <strong>sended</strong><br></br>
              <strong>{transaction.receiver}</strong>
              <span className="amountpositive">-{transaction.amount}€</span>
            </>
          ) : (
            <>
            <strong>received</strong><br></br>
              <strong>{transaction.sender}</strong>
              <span className="amountnegative">+{transaction.amount}€</span>
            </>
          )}
          <br />
          <div className="cardContainer">
          Bank purpose: {transaction.transferMessage}
          </div>
         
          <br />
        </li>
      ))}
    </ul>
  ) : (
    <p>No transactions found for the user.</p>
  )}
</div>
</div>









<Footer></Footer>



    </div>
  );
};

export default TransactionsPage;
