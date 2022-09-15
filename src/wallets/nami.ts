import { IWallet, WalletInfo, WALLET_IDS } from './base';

export const namiWallet: IWallet = {
  getId: function (): string {
    return WALLET_IDS.Nami;
  },

  isAvailable: function (): boolean {
    return !!window?.cardano?.nami;
  },

  enable: async function (): Promise<any> {
    return await window?.cardano?.nami.enable();
  },

  getInfo: function (): WalletInfo {
    return {
      id: WALLET_IDS.Nami,
      icon: window?.cardano?.nami.icon,
      name: window?.cardano?.nami.name,
      apiVersion: window?.cardano?.nami.apiVersion
    }
  }
};