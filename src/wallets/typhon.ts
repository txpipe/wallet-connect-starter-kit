import { IWallet, WalletInfo, WALLET_IDS } from './base';

export const typhonWallet: IWallet = {
  getId: function (): string {
    return WALLET_IDS.Typhon;
  },

  isAvailable: function (): boolean {
    return !!window?.cardano?.typhon;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.typhon.enable();
  },

  getInfo: function (): WalletInfo {
    return {
      id: WALLET_IDS.Typhon,
      icon: window?.cardano?.typhon.icon,
      name: window?.cardano?.typhon.name,
      apiVersion: window?.cardano?.typhon.apiVersion
    }
  }
};