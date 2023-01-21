import { WalletMetadata } from "../hooks/listWallets";

export enum WALLET_IDS {
  CardWallet = "cardwallet",
  Eternl = "eternl",
  Flint = "flint",
  Gero = "gero",
  Nami = "nami",
  Typhon = "typhon",
  Yoroi = "yoroi",
}

export interface Wallet {
  isAvailable(): boolean;
  enable(): Promise<any>;
  getMetadata(): WalletMetadata;
}
