import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../apiKey";
import Footer from "../ui/Footer";
import style from "../pages/TransactionPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillTransfer,
  faBuildingColumns,
  faCommentsDollar,
  faPiggyBank,
  faIdCard,
  faMoneyBill,
  faBarcode,
  faMoneyBillWave,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

// Import Recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BackButton from "../ui/BackButton";

const TransactionsPage = () => {
  const { id: senderIdFromURL } = useParams();
  const [amount, setAmount] = useState("");
  const [transferMessage, setTransferMessage] = useState("");
  const [receiverOptions, setReceiverOptions] = useState([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState("");
  const [senderId, setSenderId] = useState(senderIdFromURL);
  const [userTransactions, setUserTransactions] = useState([]);
  const [storedToken, setStoredToken] = useState(
    localStorage.getItem("authToken")
  );
  const [depositAmount, setDepositAmount] = useState(""); // New state to store the deposit amount
  const [chartData, setChartData] = useState([]);

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
        // Fetch the user's transactions after a successful transaction
        fetchUserTransactions();
      })
      .catch((error) => {
        console.error("Error making a new transaction:", error);
      });
  };

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    // Call the handleDeposit function with the user ID and the deposit amount
    handleDeposit(senderId, parseFloat(depositAmount)); // Convert depositAmount to a number (assuming it's a floating-point number)
    // Clear the deposit amount field after submitting
    setDepositAmount("");
  };

  const handleDeposit = (userId, amountToDeposit) => {
    axios
      .post(
        `${API_URL}/api/users/${userId}/account`,
        {
          amount: amountToDeposit,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Deposit successful:", response.data);
        // Fetch the user's transactions after a successful deposit
        fetchUserTransactions();
      })
      .catch((error) => {
        console.error("Error making a deposit:", error);
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
        setUserTransactions(response.data.transactions.reverse());
        // Update the chart data with the new transactions
        updateChartData(response.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  // Function to update the chart data based on the user's transactions
  const updateChartData = (transactions) => {
    const data = transactions.map((transaction, index) => ({
      id: index + 1, // X-axis value representing the transaction order
      amount: transaction.amount, // Y-axis value representing the transaction amount
    }));
    setChartData(data);
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
      <div className="bottomMargin">
        <BackButton to={`/profile/${senderIdFromURL}`} />
        <form onSubmit={handleSubmit} className="cardContainerNew">
          <div>
            <label className="formContainerLabel">
              <FontAwesomeIcon icon={faBarcode} /> Sender ID
              <input
                type="text"
                value={senderId}
                readOnly
                className="formContainerInput"
              />
            </label>
            <label className="formContainerLabel">
              <FontAwesomeIcon icon={faMoneyBill} /> Amount
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount in $"
                className="formContainerInput"
              />
            </label>
            <label className="formContainerLabel">
              <FontAwesomeIcon icon={faCommentsDollar} /> Bank purpose
              <input
                type="text"
                value={transferMessage}
                onChange={handleTransferMessageChange}
                placeholder="Enter the purpose of the transaction"
                className="formContainerInput"
              />
            </label>
            <label className="formContainerLabel">
              <FontAwesomeIcon icon={faMoneyBillWave} /> Receiver
              <select
                value={selectedReceiverId}
                onChange={handleReceiverChange}
                className="formContainerInput"
              >
                <option value="">Select a receiver</option>
                {receiverOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <br></br>
          <button className="buttonRedNew" type="submit">
            <FontAwesomeIcon icon={faMoneyBillTransfer} /> Transfer
          </button>
        </form>
        <div className="cardContainerNew">
          <label className="formContainerLabel">
            <FontAwesomeIcon icon={faBarcode} /> Deposit amount
          </label>
          <form onSubmit={handleDepositSubmit}>
            <label className="formContainerLabel">
              <input
                type="number"
                value={depositAmount}
                onChange={handleDepositChange}
                placeholder="Enter deposit amount in $"
                className="formContainerInput"
              />
            </label>
            <button className="buttonRedNew" type="submit">
              <FontAwesomeIcon icon={faBuildingColumns} /> Deposit
            </button>
          </form>
        </div>

        <div className="cardContainerNew">
          <label className="formContainerLabel">
            <FontAwesomeIcon icon={faChartLine} /> Expenses chart
          </label>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#e94653"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          {/* Rendering transactions */}
          {userTransactions.length > 0 ? (
            <ul className="cardContainerInvisible">
              <h3 className="h3Class">Your transactions:</h3>
              {userTransactions.map((transaction) => (
                <li className="cardContainerTransactions" key={transaction._id}>
                  {transaction.sender === senderId ? (
                    <>
                      <div className="headlineContainer">
                        <strong>
                          <FontAwesomeIcon icon={faIdCard} />
                        </strong>

                        <strong>{transaction.receiver}</strong>

                        <span className="amountpositive">
                          -{transaction.amount}$
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="headlineContainer">
                        <strong>
                          <FontAwesomeIcon icon={faIdCard} />
                        </strong>

                        <strong>{transaction.sender}</strong>

                        <span className="amountnegative">
                          +{transaction.amount}$
                        </span>
                      </div>
                    </>
                  )}
                  <br />

                  <div className="cardContainerNew">
                    <FontAwesomeIcon icon={faCommentsDollar} /> Bank purpose:{" "}
                    {transaction.transferMessage}
                  </div>
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
