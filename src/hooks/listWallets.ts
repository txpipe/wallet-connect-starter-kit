import { useEffect, useState } from "react";
import { getAvailableWallets } from "../wallets";
import { WALLET_IDS } from "../wallets/base";

export type WalletMetadata = {
  id: WALLET_IDS,
  icon: string;
  name: string;
  apiVersion: string;
};

export const useListWallets = () => {
  const [wallets, setWallets] = useState<WalletMetadata[]>([]);

  useEffect(() => {
    setWallets(getAvailableWallets());
  }, []);

  return wallets;
};
