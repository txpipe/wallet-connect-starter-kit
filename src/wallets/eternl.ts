import { IWallet, WalletInfo, WALLET_IDS } from './base';

export const eternlWallet: IWallet = {
  getId: function (): string {
    return WALLET_IDS.Eternl;
  },

  isAvailable: function (): boolean {
    return !!window?.cardano?.eternl;
  },
  
  enable: async function (): Promise<any> {
    return await window?.cardano?.eternl.enable();
  },

  getInfo: function (): WalletInfo {
    return {
      id: WALLET_IDS.Eternl,
      icon: window?.cardano?.eternl.icon,
      name: window?.cardano?.eternl.name,
      apiVersion: window?.cardano?.eternl.apiVersion
    }
  }
};