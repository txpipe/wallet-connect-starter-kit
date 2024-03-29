import { WalletMetadata } from "../hooks/listWallets";
import { cardWallet } from "./cardwallet";
import { eternlWallet } from "./eternl";
import { flintWallet } from "./flint";
import { geroWallet } from "./gero";
import { namiWallet } from "./nami";
import { typhonWallet } from "./typhon";
import { yoroiWallet } from "./yoroi";

export const SUPPORTED_WALLETS = [
  cardWallet,
  eternlWallet,
  flintWallet,
  geroWallet,
  namiWallet,
  typhonWallet,
  yoroiWallet,
];

export function getAvailableWallets(): WalletMetadata[] {
  const result: WalletMetadata[] = [];

  SUPPORTED_WALLETS.forEach((wallet) => {
    if (wallet.isAvailable()) {
      result.push(wallet.getMetadata());
    }
  });

  return result;
}
