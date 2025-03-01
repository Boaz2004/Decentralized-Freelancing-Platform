import React, { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    async function checkMetaMask() {
      const provider = await detectEthereumProvider();

      if (provider) {
        console.log('MetaMask is installed!');
        setIsConnected(true);
      } else {
        console.log('Please install MetaMask!');
        setIsConnected(false);
      }
    }

    checkMetaMask();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log('Connected account:', accounts[0]);
      } else {
        alert('MetaMask is not available. Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Web3 Login</h1>
      {!isConnected ? (
        <p className="install-message">Please install MetaMask to use this app.</p>
      ) : account ? (
        <p className="account-display">Connected with account: {account}</p>
      ) : (
        <button className="metamask-button" onClick={handleLogin}>
          CLick to connect MetaMask
        </button>
      )}
    </div>
  );
};

export default Login;