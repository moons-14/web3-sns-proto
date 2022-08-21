import type { ethers, Signer } from "ethers";

type EIP1193Events = {
  accountsChanged: (ids: string[]) => void;
  chainChanged: (chainId: string) => void;
  disconnect: () => void;
};

export interface EIP1193 extends ethers.providers.ExternalProvider {
  isMetaMask?: boolean;
  on: <T extends keyof EIP1193Events>(
    event: T,
    callback: EIP1193Events[T]
  ) => void;
}

export type ConnectorEvents =
  | "signerChanged"
  | "chainChanged"
  | "accountsChanged"
  | "disconnect";

export type ConnectorEventValues = {
  signerChanged: Signer;
  chainChanged: number;
  accountsChanged: string[];
  disconnect: undefined;
};

export interface Connector {
  getSigner(): Signer | null;
  getAccounts(): string[];
  getChainId(): number | null;
  on<T extends ConnectorEvents>(
    event: T,
    listener: (value: ConnectorEventValues[T]) => void
  ): void;
}
