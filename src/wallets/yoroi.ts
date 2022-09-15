import { IWallet, WalletInfo, WALLET_IDS } from './base';

export const yoroiWallet: IWallet = {
  getId: function (): string {
    return WALLET_IDS.Yoroi;
  },

  isAvailable: function (): boolean {
    return !!window?.cardano?.yoroi;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.yoroi.enable();
  },

  getInfo: function (): WalletInfo {
    return {
      id: WALLET_IDS.Yoroi,
      icon: window?.cardano?.yoroi.icon,
      name: window?.cardano?.yoroi.name,
      apiVersion: window?.cardano?.yoroi.apiVersion
    }
  }
};