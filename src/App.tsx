import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { WalletInfo, WALLET_IDS } from "./wallets/base";
import {
  enable,
  getAvailableWallets,
  getBalance,
  getChangeAddress,
  getNetwork,
  getRewardAddresses,
  getUnusedAddresses,
  getUsedAddresses,
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

type WalletState = {
  balance: string;
  network: string;
  unusedAddresses: string[];
  usedAddresses: string[];
  rewardAddresses: string[];
  changeAddress: string;
};

function AddressTableRow(props: { address: string }) {
  return (
    <tr className="odd:bg-gray-900 even:bg-gray-850 hover:bg-gray-750 transition-all">
      <td className="text-sm px-6 py-3">{props.address}</td>
    </tr>
  );
}

function AddressesTable(props: { addresses: string[] }) {
  return (
    <table className="rounded-md overflow-hidden w-full">
      <thead className="border-b border-gray-950">
        <tr>
          <th
            className="bg-gray-900 py-3 px-6 text-sm text-left text-gray-400 font-normal"
            scope="col"
          >
            Address
          </th>
        </tr>
      </thead>
      <tbody>
        {props.addresses.map((x) => (
          <AddressTableRow key={x} address={x} />
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [wallets, setWallets] = useState([] as WalletInfo[]);
  const [selectedWallet, setSelectedWallet] = useState<
    WALLET_IDS | undefined
  >();
  const [enabledWallet, setEnabledWallet] = useState<WalletInfo>();
  const [walletState, setWalletState] = useState<Partial<WalletState>>();
  const [error, setError] = useState();

  const mergeWalletState = useCallback((delta: Partial<WalletState>) => {
    setWalletState((prev) => ({ ...prev, ...delta }));
  }, []);

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
        mergeWalletState({ balance: await getBalance() });

        // Gets the enabled wallet network
        mergeWalletState({ network: await getNetwork() });

        // Gets the list of unused addresses by the wallet
        mergeWalletState({ usedAddresses: await getUsedAddresses() });

        // Gets the list of unused addresses by the wallet
        mergeWalletState({ unusedAddresses: await getUnusedAddresses() });

        mergeWalletState({ rewardAddresses: await getRewardAddresses() });

        mergeWalletState({ changeAddress: await getChangeAddress() });
      }
    } catch (error: any) {
      setError(error.message || "unknown error");
    }
  }, [mergeWalletState, selectedWallet]);

  return (
    <div className="bg-gray-950 w-screen h-full">
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
                Balance:{" "}
                <span className="text-white">{walletState?.balance}</span>
              </p>
              <p className="font-semibold uppercase text-txblue text-xs mt-2">
                Network:{" "}
                <span className="text-white">{walletState?.network}</span>
              </p>

              {walletState?.usedAddresses && (
                <>
                  <h4 className="font-semibold uppercase text-txblue text-xs mt-8 mb-4">
                    used addresses
                  </h4>
                  <AddressesTable
                    addresses={walletState.usedAddresses}
                  ></AddressesTable>
                </>
              )}
              {walletState?.unusedAddresses && (
                <>
                  <h4 className="font-semibold uppercase text-txblue text-xs mt-8 mb-4">
                    unused addresses
                  </h4>
                  <AddressesTable
                    addresses={walletState.unusedAddresses}
                  ></AddressesTable>
                </>
              )}
              {walletState?.rewardAddresses && (
                <>
                  <h4 className="font-semibold uppercase text-txblue text-xs mt-8 mb-4">
                    reward addresses
                  </h4>
                  <AddressesTable
                    addresses={walletState.rewardAddresses}
                  ></AddressesTable>
                </>
              )}
              {walletState?.changeAddress && (
                <>
                  <h4 className="font-semibold uppercase text-txblue text-xs mt-8 mb-4">
                    Change address
                  </h4>
                  <AddressesTable
                    addresses={[walletState.changeAddress]}
                  ></AddressesTable>
                </>
              )}
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
