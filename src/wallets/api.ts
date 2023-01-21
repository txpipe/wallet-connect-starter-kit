import { Address, Value } from "@emurgo/cardano-serialization-lib-browser";
import { SUPPORTED_WALLETS } from ".";
import { WalletMetadata } from "../hooks/listWallets";
import { WALLET_IDS, Wallet } from "./base";
import { WalletNotAvailableError, WalletNotEnabledError } from "./errors";

interface CIP30 {
  getBalance(): Promise<Number>;
  getNetworkId(): Promise<Number>;
  getRewardAddresses(): Promise<Address[]>;
  getUnusedAddresses(): Promise<Address[]>;
  getUsedAddresses(): Promise<Address[]>;
  getChangeAddress(): Promise<Address>;
  getUtxos(): Promise<any[]>;
  signData(address: Address, payload: string): Promise<any>;
  signTx(): Promise<any>;
  submitTx(): Promise<any>;
  getCollateral(): Promise<any>;
}

// // Reference to the enabled Wallet API
let CONNECTED_WALLET_API: CIP30 | undefined = undefined;

/**
 * Enables a wallet by its id initializing its api reference
 * @param id
 */
async function enable(id: WALLET_IDS): Promise<WalletMetadata> {
  const wallet = SUPPORTED_WALLETS.find(
    (w: Wallet) => w.getMetadata().id === id
  );

  if (!wallet) throw new WalletNotAvailableError();

  try {
    CONNECTED_WALLET_API = await wallet.enable();
    return wallet.getMetadata();
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}

/**
 * Returns the wallet balance
 * @returns
 */
async function getBalance(): Promise<string> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const balanceCBORHex = await CONNECTED_WALLET_API.getBalance();
  const balance = Value.from_hex(String(balanceCBORHex)).coin().to_str();
  return balance;
}

/**
 * Returns the Wallet network Id
 *  - 0 for Testnet
 *  - 1 for Mainnet
 * Requires a wallet to be enabled
 */
async function getNetwork(): Promise<string> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const networkId = await CONNECTED_WALLET_API.getNetworkId();

  // Converts the network id to human readable names
  switch (networkId) {
    case 0:
      return "testnet";
    case 1:
      return "mainnet";
    default:
      return "unknown";
  }
}

/**
 * Returns a list of all used (included in some on-chain transaction) addresses controlled by the wallet
 */
async function getUsedAddresses(): Promise<string[]> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const addresses = await CONNECTED_WALLET_API.getUsedAddresses();
  return addresses.map((item) =>
    Address.from_hex(String(item)).to_bech32(undefined)
  );
}

/**
 * Returns a list of unused addresses controlled by the wallet.
 * @returns
 */
async function getUnusedAddresses(): Promise<string[]> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const addresses = await CONNECTED_WALLET_API.getUnusedAddresses();
  return addresses.map((item) =>
    Address.from_hex(String(item)).to_bech32(undefined)
  );
}

/**
 * Returns the reward addresses owned by the wallet. This can return multiple addresses
 * @returns
 */
async function getRewardAddresses(): Promise<string[]> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const addresses = await CONNECTED_WALLET_API.getRewardAddresses();
  return addresses.map((item) =>
    Address.from_hex(String(item)).to_bech32(undefined)
  );
}

/**
 * Returns an address owned by the wallet that should be used as a change address to return
 * leftover assets during transaction creation back to the connected wallet.
 * This can be used as a generic receive address as well.
 * @returns
 */
async function getChangeAddress(): Promise<string> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const address = await CONNECTED_WALLET_API.getChangeAddress();
  return Address.from_hex(String(address)).to_bech32();
}

/**
 * return a list of all UTXOs (unspent transaction outputs) controlled by the wallet.
 * @returns
 */
async function getUtxos(): Promise<any[]> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const utxos = await CONNECTED_WALLET_API.getUtxos();
  return utxos;
}

export {
  enable,
  getBalance,
  getNetwork,
  getUsedAddresses,
  getUnusedAddresses,
  getRewardAddresses,
  getChangeAddress,
  getUtxos,
};
