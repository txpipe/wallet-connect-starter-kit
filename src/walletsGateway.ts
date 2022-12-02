import { Address, Value } from "@emurgo/cardano-serialization-lib-asmjs"
import { SUPPORTED_WALLETS } from "./wallets";
import { IWallet, WalletInfo, WALLET_IDS } from "./wallets/base"
import { WalletNotAvailableError, WalletNotEnabledError } from "./wallets/errors";

interface IConnectedWallet {
    getBalance(): Promise<Number>,
    getNetworkId(): Promise<Number>,
    getRewardAddresses(): Promise<Address[]>,
    getUnusedAddresses(): Promise<Address[]>,
    getUsedAddresses(): Promise<Address[]>,
    getChangeAddress(): Promise<Address>,
    getUtxos(): Promise<any[]>,
    signData(address: Address, payload: string): Promise<any>,
    signTx(): Promise<any>, // Not implemented
    submitTx(): Promise<any> // Not implemented
    getCollateral(): Promise<any>, // Not implemented
}

// // Reference to the enabled Wallet API
let CONNECTED_WALLET_API: IConnectedWallet | undefined = undefined;

// const availableWallets: {[key: string]: IWallet} = {};

function getAvailableWallets(): WalletInfo[] {
  const result: WalletInfo[] = [];

  SUPPORTED_WALLETS.forEach(wallet => {
    if (wallet.isAvailable()) {
      result.push(wallet.getInfo())
    }
  });

  return result;
}

/**
 * Enables a wallet by its id initializing its api reference
 * @param id 
 */
async function enable(id: WALLET_IDS): Promise<WalletInfo> {
  const wallet = SUPPORTED_WALLETS.find((w: IWallet) => w.getId() === id);
  if (!wallet) throw new WalletNotAvailableError();

  try {
    CONNECTED_WALLET_API = await wallet.enable();

    // After enabling the wallet it returns back its info
    return wallet.getInfo();
  }catch(err: any) {
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
async function getNetwork(): Promise<string>{
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const networkId = await CONNECTED_WALLET_API.getNetworkId();

  // Converte the network id to human readable names
  switch(networkId) {
    case 0:
      return 'testnet';
    case 1:
      return 'mainnet';
    default:
      return 'unknown';
  }
}

/**
 * Returns a list of all used (included in some on-chain transaction) addresses controlled by the wallet
 */
async function getUsedAddresses():Promise<string[]> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const addresses = await CONNECTED_WALLET_API.getUsedAddresses();
  return addresses.map(item => Address.from_hex(String(item)).to_bech32(undefined));
}

/**
 * Returns a list of unused addresses controlled by the wallet.
 * @returns 
 */
async function getUnusedAddresses(): Promise<string[]> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const addresses = await CONNECTED_WALLET_API.getUnusedAddresses();
  return addresses.map(item => Address.from_hex(String(item)).to_bech32(undefined));
}

/**
 * Returns the reward addresses owned by the wallet. This can return multiple addresses
 * @returns 
 */
async function getRewardAddresses(): Promise<string[]> {
  if (!CONNECTED_WALLET_API) throw new WalletNotEnabledError();
  const addresses = await CONNECTED_WALLET_API.getRewardAddresses();
  return addresses.map(item => Address.from_hex(String(item)).to_bech32(undefined));
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
    getAvailableWallets,
    enable,
    getBalance,
    getNetwork,
    getUsedAddresses,
    getUnusedAddresses,
    getRewardAddresses,
    getChangeAddress,
    getUtxos,
}