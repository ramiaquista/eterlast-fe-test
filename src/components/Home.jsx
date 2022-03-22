import React from 'react';
import Wallet from './Wallet';

const Home = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Mint <br /> your own new NFT!
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Mint for free just connecting your Metamask Wallet!
          </p>
          <Wallet />
        </div>
      </div>
    </div>
  );
};

export default Home;