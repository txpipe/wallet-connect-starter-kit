import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { WalletInfo, WALLET_IDS } from "./wallets/base";
import {
  enable,
  getAvailableWallets,
  getBalance,
  getNetwork,
} from "./walletsGateway";

function WalletCard(props: {
  wallet: WalletInfo;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`p-6 rounded-md bg-gray-900 transition-all shadow-lg cursor-pointer rounded-md ${
        props.selected ? "border-txpink border-2" : ""
      }`}
      onClick={() => props.onClick()}
    >
      <div className="flex">
        <img src={props.wallet.icon} alt="wallet-logo" width={28} height={28} />

        <h3 className="text-xl font-medium tracking-wide ml-2">
          {props.wallet.name}
        </h3>
      </div>
      <div className="flex flex-col mt-4">
        <p className="text-gray-300 text-sm">{`id: ${props.wallet.id}`}</p>
        <p className="text-gray-300 text-sm">{`api version: ${props.wallet.apiVersion}`}</p>
      </div>
    </div>
  );
}

function App() {
  const [wallets, setWallets] = useState([] as WalletInfo[]);
  const [selectedWallet, setSelectedWallet] = useState<
    WALLET_IDS | undefined
  >();
  const [enabledWallet, setEnabledWallet] = useState<WalletInfo>();
  const [balance, setBalance] = useState<string>();
  const [network, setNetwork] = useState<string>();
  const [error, setError] = useState();

  useEffect(() => {
    setWallets(getAvailableWallets());
  }, []);

  useMemo(async () => {
    try {
      if (selectedWallet) {
        // clears the error state
        setError(undefined);

        // Enables the wallet
        setEnabledWallet(await enable(selectedWallet!));

        // Gets the enabled wallet balance
        setBalance(await getBalance());

        // Gets the enabled wallet network
        setNetwork(await getNetwork());
      }
    } catch (error: any) {
      setError(error.message || "unknown error");
    }
  }, [selectedWallet]);

  return (
    <div className="bg-gray-950 h-screen w-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl p-16 text-white">
        <header className="flex flex-col mb-4">
          <div className="flex">
            <img src="/logo.svg" className="mr-4 w-5 h-5" alt="TxPipe Logo" />
            <p className="text-sm">Starter Kit provided by TxPipe</p>
          </div>

          <h1 className="text-4xl font-light mt-2">Wallet Connector</h1>
          <p className="text-gray-400 mt-8">
            Select which wallet to connect and perform basic interactions.
          </p>
        </header>

        {/* Available wallets */}
        {wallets.length ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {wallets.map((wallet: WalletInfo) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                selected={selectedWallet === wallet.id}
                onClick={() => {
                  setSelectedWallet(wallet.id);
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-red-500">No wallets were found in your browser.</p>
        )}

        {/* Connected Wallet information */}
        <div className="mt-8">
          {enabledWallet ? (
            <div className="rounded-md bg-gray-600 bg-opacity-10 p-6">
              <h3 className="text-xl font-medium tracking-wide">{`Connected to ${enabledWallet.name}`}</h3>
              <p className="font-semibold uppercase text-txblue text-xs mt-2">
                Wallet: <span className="text-white">{selectedWallet}</span>
              </p>
              <p className="font-semibold uppercase text-txblue text-xs mt-2">
                Balance: <span className="text-white">{balance}</span>
              </p>
              <p className="font-semibold uppercase text-txblue text-xs mt-2">
                Network: <span className="text-white">{network}</span>
              </p>
            </div>
          ) : null}
        </div>

        {/* Displays any error message */}
        {error ? (
          <p className="text-sm text-red-500 mt-2">{`There was an error connecting to the selected wallet: ${error}`}</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
