import { WalletMetadata } from "../hooks/listWallets";
import { Wallet, WALLET_IDS } from "./base";

export const flintWallet: Wallet = {
  isAvailable: function (): boolean {
    return !!window?.cardano?.flint;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.flint.enable();
  },

  getMetadata: function (): WalletMetadata {
    return {
      id: WALLET_IDS.Flint,
      icon: window?.cardano?.flint?.icon,
      name: window?.cardano?.flint?.name,
      apiVersion: window?.cardano?.flint?.apiVersion,
    };
  },
};
