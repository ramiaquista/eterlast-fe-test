import React, { useState } from 'react';
import { ethers } from 'ethers';

const Wallet = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [walletNetWork, setWalletNetWork] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [mintBtnText, setMintBtnText] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      setErrorMessage('Intall MetaMask Extension');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
    getUserNetWork();
    setConnButtonText('Disconnect Wallet');
    setMintBtnText('Mint FOR FREE');
  };

  const getUserNetWork = () => {
    const ID = window.ethereum.networkVersion;
    switch (ID) {
      case '1':
        setWalletNetWork('Mainnet Network');
        break;
      case '4':
        setWalletNetWork('Rinkeby Network');
        break;
      case '3':
        setWalletNetWork('Ropsten Network');
        break;
      case '42':
        setWalletNetWork('Kovan Network');
        break;
      case '5':
        setWalletNetWork('Goerli Network');
        break;
      default:
        console.log('This is an unknown network.');
    }
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [address, 'latest'] })
      .then((balance) => {
        // Conver WEI into ETH to make it more human readable.
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  const mintBtnHandler = () => {
    const mintingData = {
      creator_wallet_id: defaultAccount,
      creator_network: walletNetWork,
      assets: [
        {
          asset_id: 'ab32809412jmcdsa',
          name: 'Maradona',
          picture:
            'https://i.pinimg.com/originals/9f/3d/23/9f3d2364f50e94e1494dafaf520c45fd.jpg',
          description: 'Maradona Iconic Photo',
          collection: 'Argentinian Futbol',
          supply: '1',
          date_of_creation: 'Mar 22',
        },
      ],
    };
    console.log(mintingData);
  };

  const chainChangeHandler = () => {
    window.location.reload();
  };

  window.ethereum.on('accountChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangeHandler);

  const mintNftButton = () => {
    return (
      <div>
        <div className="flex flex-col">
          <h3 className="font-light text-white">NetWork: {walletNetWork}</h3>
          <h3 className="font-light text-white">Address: {defaultAccount}</h3>
          <h3 className="font-light text-white">Balance: {userBalance}</h3>
        </div>
        <button
          type="button"
          onClick={mintBtnHandler}
          className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          <p className="text-white text-base font-semibold">{mintBtnText}</p>
        </button>
      </div>
    );
  };

  const connectWalletButton = () => {
    return (
      <button
        type="button"
        onClick={connectWalletHandler}
        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
      >
        <p className="text-white text-base font-semibold">{connButtonText}</p>
      </button>
    );
  };

  return (
    <div className="mt-10">
      {defaultAccount ? mintNftButton() : connectWalletButton()}

      <p className="text-white text-base font">{errorMessage}</p>
    </div>
  );
};

export default Wallet;
