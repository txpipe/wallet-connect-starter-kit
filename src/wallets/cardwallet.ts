import { IWallet, WalletInfo, WALLET_IDS } from './base';

export const cardWallet: IWallet = {
  getId: function (): string {
    return WALLET_IDS.CardWallet;
  },

  isAvailable: function (): boolean {
    return !!window?.cardano?.cardwallet;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.cardwallet.enable();
  },

  getInfo: function (): WalletInfo {
    return {
      id: WALLET_IDS.CardWallet,
      icon: window?.cardano?.cardwallet.icon,
      name: window?.cardano?.cardwallet.name,
      apiVersion: window?.cardano?.cardwallet.apiVersion
    }
  }
};