import { IWallet, WalletInfo, WALLET_IDS } from './base';

export const flintWallet: IWallet = {
  getId: function (): string {
    return WALLET_IDS.Flint;
  },

  isAvailable: function (): boolean {
    return !!window?.cardano?.flint;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.flint.enable();
  },

  getInfo: function (): WalletInfo {
    return {
      id: WALLET_IDS.Flint,
      icon: window?.cardano?.flint.icon,
      name: window?.cardano?.flint.name,
      apiVersion: window?.cardano?.flint.apiVersion
    }
  }
};