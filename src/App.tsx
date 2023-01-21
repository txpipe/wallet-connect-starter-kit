import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { CardWallet } from "./fragments/card-wallet";
import { useListWallets, WalletMetadata } from "./hooks/listWallets";
import {
  enable,
  getBalance,
  getChangeAddress,
  getNetwork,
  getRewardAddresses,
  getUnusedAddresses,
  getUsedAddresses,
} from "./wallets/api";

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

type WalletState = {
  connected: boolean;
  balance: string;
  network: string;
  unusedAddresses: string[];
  usedAddresses: string[];
  rewardAddresses: string[];
  changeAddress: string;
};

function App() {
  const availableWallets = useListWallets();
  const [selectedWallet, setSelectedWallet] = useState<
    WalletMetadata | undefined
  >();
  const [enabledWallet, setEnabledWallet] = useState<Partial<WalletState>>();
  const [error, setError] = useState();

  const mergeEnabledWalletState = useCallback((delta: Partial<WalletState>) => {
    setEnabledWallet((prev) => ({ ...prev, ...delta }));
  }, []);

  useMemo(async () => {
    try {
      setError(undefined);

      if (!selectedWallet) return;

      mergeEnabledWalletState({
        connected: false,
        balance: "",
        network: "",
        usedAddresses: [],
        unusedAddresses: [],
        rewardAddresses: [],
        changeAddress: "",
      });

      await enable(selectedWallet.id);

      mergeEnabledWalletState({ connected: true });

      const network = await getNetwork();

      const usedAddresses = await getUsedAddresses();

      const unusedAddresses = await getUnusedAddresses();

      const rewardAddresses = await getRewardAddresses();

      const changeAddress = await getChangeAddress();

      mergeEnabledWalletState({
        network,
        usedAddresses,
        unusedAddresses,
        rewardAddresses,
        changeAddress,
      });

      const balance = await getBalance();

      mergeEnabledWalletState({ balance });
    } catch (err: any) {
      setError(err.message || err.info || err);
    }
  }, [mergeEnabledWalletState, selectedWallet]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow flex overflow-auto bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl p-16 text-white ">
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

          {availableWallets.length ? (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {availableWallets.map((wallet: WalletMetadata) => (
                <CardWallet
                  key={wallet.id}
                  metadata={wallet}
                  selected={selectedWallet?.id === wallet.id}
                  onClick={() => {
                    setSelectedWallet(wallet);
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-red-500">
              No wallets were found in your browser.
            </p>
          )}

          {/* Connected Wallet information */}
          <div className="mt-8">
            {enabledWallet?.connected ? (
              <div className="rounded-md bg-gray-600 bg-opacity-10 p-6">
                <h3 className="text-xl font-medium tracking-wide">{`Connected to ${selectedWallet?.id}`}</h3>
                <p className="font-semibold uppercase text-txblue text-xs mt-2">
                  Wallet:{" "}
                  <span className="text-white">{selectedWallet?.name}</span>
                </p>
                <p className="font-semibold uppercase text-txblue text-xs mt-2">
                  Balance:{" "}
                  <span className="text-white">{enabledWallet?.balance}</span>
                </p>
                <p className="font-semibold uppercase text-txblue text-xs mt-2">
                  Network:{" "}
                  <span className="text-white">{enabledWallet?.network}</span>
                </p>

                {enabledWallet?.usedAddresses && (
                  <>
                    <h4 className="font-semibold uppercase text-txblue text-xs mt-8 mb-4">
                      used addresses
                    </h4>
                    <AddressesTable
                      addresses={enabledWallet.usedAddresses}
                    ></AddressesTable>
                  </>
                )}
                {enabledWallet?.unusedAddresses && (
                  <>
                    <h4 className="font-semibold uppercase text-txblue text-xs mt-8 mb-4">
                      unused addresses
                    </h4>
                    <AddressesTable
                      addresses={enabledWallet.unusedAddresses}
                    ></AddressesTable>
                  </>
                )}
                {enabledWallet?.rewardAddresses && (
                  <>
                    <h4 className="font-semibold uppercase text-txblue text-xs mt-8 mb-4">
                      reward addresses
                    </h4>
                    <AddressesTable
                      addresses={enabledWallet.rewardAddresses}
                    ></AddressesTable>
                  </>
                )}
                {enabledWallet?.changeAddress && (
                  <>
                    <h4 className="font-semibold uppercase text-txblue text-xs mt-8 mb-4">
                      Change address
                    </h4>
                    <AddressesTable
                      addresses={[enabledWallet.changeAddress]}
                    ></AddressesTable>
                  </>
                )}
              </div>
            ) : null}
          </div>
          {error ? (
            <p className="text-sm text-red-500 mt-2">{`There was an error connecting to the selected wallet: ${error}`}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
