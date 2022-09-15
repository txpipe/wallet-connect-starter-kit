import { IWallet, WalletInfo, WALLET_IDS } from './base';

export const geroWallet: IWallet = {
  getId: function (): string {
    return WALLET_IDS.Gero;
  },

  isAvailable: function (): boolean {
    return !!window?.cardano?.gerowallet;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.gerowallet.enable();
  },

  getInfo: function (): WalletInfo {
    return {
      id: WALLET_IDS.Gero,
      icon: window?.cardano?.gerowallet.icon,
      name: window?.cardano?.gerowallet.name,
      apiVersion: window?.cardano?.gerowallet.apiVersion
    }
  }
};