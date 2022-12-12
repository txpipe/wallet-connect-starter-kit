import { WalletMetadata } from "../hooks/listWallets";
import { Wallet, WALLET_IDS } from "./base";

export const ccvaultWallet: Wallet = {
  isAvailable: function (): boolean {
    return !!window?.cardano?.ccvault;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.ccvault.enable();
  },

  getMetadata: function (): WalletMetadata {
    return {
      id: WALLET_IDS.CCVault,
      icon: window?.cardano?.ccvault?.icon,
      name: window?.cardano?.ccvault?.name,
      apiVersion: window?.cardano?.ccvault?.apiVersion,
    };
  },
};
