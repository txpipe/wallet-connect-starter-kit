import { IWallet, WalletInfo, WALLET_IDS } from './base';

export const ccvaultWallet: IWallet = {
  getId: function (): string {
    return WALLET_IDS.CCVault;
  },

  isAvailable: function (): boolean {
    return !!window?.cardano?.ccvault;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.ccvault.enable();
  },

  getInfo: function (): WalletInfo {
    return {
      id: WALLET_IDS.CCVault,
      icon: window?.cardano?.ccvault.icon,
      name: window?.cardano?.ccvault.name,
      apiVersion: window?.cardano?.ccvault.apiVersion
    }
  }
};