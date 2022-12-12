import { WalletMetadata } from "../hooks/listWallets";
import { Wallet, WALLET_IDS } from "./base";

export const yoroiWallet: Wallet = {
  isAvailable: function (): boolean {
    return !!window?.cardano?.yoroi;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.yoroi.enable();
  },

  getMetadata: function (): WalletMetadata {
    return {
      id: WALLET_IDS.Yoroi,
      icon: window?.cardano?.yoroi?.icon,
      name: window?.cardano?.yoroi?.name,
      apiVersion: window?.cardano?.yoroi?.apiVersion,
    };
  },
};
