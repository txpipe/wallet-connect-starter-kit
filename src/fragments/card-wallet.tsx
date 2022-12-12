import { WalletMetadata } from "../hooks/listWallets";

export function CardWallet(props: {
  metadata: WalletMetadata;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`p-6 rounded-md bg-gray-900 transition-all shadow-lg cursor-pointer rounded-md ${
        props.selected ? "border-txpink border-2" : ""
      }`}
      onClick={() => props.onClick()}
    >
      <div className="flex">
        <img
          src={props.metadata.icon}
          alt="wallet-logo"
          width={28}
          height={28}
        />

        <h3 className="text-xl font-medium tracking-wide ml-2">
          {props.metadata?.name}
        </h3>
      </div>
      <div className="flex flex-col mt-4">
        <p className="text-gray-300 text-sm">{`id: ${props.metadata.id}`}</p>
        <p className="text-gray-300 text-sm">{`api version: ${props.metadata.apiVersion}`}</p>
      </div>
    </div>
  );
}
