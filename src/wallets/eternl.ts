import { WalletMetadata } from "../hooks/listWallets";
import { Wallet, WALLET_IDS } from "./base";

export const eternlWallet: Wallet = {
  isAvailable: function (): boolean {
    return !!window?.cardano?.eternl;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.eternl.enable();
  },

  getMetadata: function (): WalletMetadata {
    return {
      id: WALLET_IDS.Eternl,
      icon: window?.cardano?.eternl?.icon,
      name: window?.cardano?.eternl?.name,
      apiVersion: window?.cardano?.eternl?.apiVersion,
    };
  },
};
