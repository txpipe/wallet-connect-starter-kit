import { cardWallet } from "./cardwallet";
import { ccvaultWallet } from "./ccvault";
import { eternlWallet } from "./eternl";
import { flintWallet } from "./flint";
import { geroWallet } from "./gero";
import { namiWallet } from "./nami";
import { typhonWallet } from "./typhon";
import { yoroiWallet } from "./yoroi";

// Array of available wallets
const SUPPORTED_WALLETS = [
    cardWallet,
    ccvaultWallet,
    eternlWallet,
    flintWallet,
    geroWallet,
    namiWallet,
    typhonWallet,
    yoroiWallet
]

export {
    SUPPORTED_WALLETS,
    cardWallet,
    ccvaultWallet,
    eternlWallet,
    flintWallet,
    geroWallet,
    namiWallet,
    typhonWallet,
    yoroiWallet
}