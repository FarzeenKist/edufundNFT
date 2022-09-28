import React from "react";
import Cover from "./components/Cover";
import { Notification } from "./components/ui/Notifications";
import Wallet from "./components/wallet";
import { useBalance, useMinterContract } from "./hooks";

import NftCard from "./components/minter/nft";
import { useContractKit } from "@celo-tools/use-contractkit";

import "./App.css";

import { Container, Nav } from "react-bootstrap";

const App = function AppWrapper() {
  /*
    address : fetch the connected wallet address
    destroy: terminate connection to user wallet
    connect : connect to the celo blockchain
     */
  const { address, destroy, connect } = useContractKit();

  //  fetch user's celo balance using hook
  const { balance, getBalance } = useBalance();

  // initialize the NFT mint contract
  const minterContract = useMinterContract();

  return (
    <>
      <Notification />

      {address ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              {/*display user wallet*/}
              <Wallet
                address={address}
                amount={balance.CELO}
                symbol="CELO"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            {/*list NFTs*/}
            <NftCard
              name="Fund an Educational Facility Project"
              updateBalance={getBalance}
              minterContract={minterContract}
            />
          </main>
        </Container>
      ) : (
        //  if user wallet is not connected display cover page
        <Cover
          name="Fund an Educational Facility Project"
          coverImg={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzQ5CvJIwej7Kg7we_8pa5FI96A2D4LfI-TQ&usqp=CAU"
          }
          connect={connect}
        />
      )}
    </>
  );
};

export default App;
