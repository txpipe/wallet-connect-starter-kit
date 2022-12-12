import { WalletMetadata } from "../hooks/listWallets";
import { Wallet, WALLET_IDS } from "./base";

export const cardWallet: Wallet = {
  isAvailable: function (): boolean {
    return !!window?.cardano?.cardwallet;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.cardwallet.enable();
  },

  getMetadata: function (): WalletMetadata {
    return {
      id: WALLET_IDS.CardWallet,
      icon: window?.cardano?.cardwallet?.icon,
      name: window?.cardano?.cardwallet?.name,
      apiVersion: window?.cardano?.cardwallet?.apiVersion,
    };
  },
  
};
