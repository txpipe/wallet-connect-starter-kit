enum WALLET_IDS {
    CardWallet = 'cardwallet',
    CCVault ='ccvault',
    Eternl = 'eternl',
    Flint ='flint',
    Gero ='gero',
    Nami = 'nami',
    Typhon = 'typhon',
    Yoroi ='yoroi',
}

/**
 * Wallet Interface
 */
interface IWallet {
    getId(): string;
    isAvailable(): boolean;
    enable(): Promise<any>;
    getInfo(): WalletInfo;
}

type WalletInfo ={
    id: WALLET_IDS,
    icon: string,
    name: string,
    apiVersion: string
}

export type { IWallet, WalletInfo };

export {
    WALLET_IDS,
};