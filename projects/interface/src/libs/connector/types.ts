import type { ChainParameter } from "@crypteen/common";
import type { TypedDataSigner } from "@ethersproject/abstract-signer";
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

export type TypedSigner = Signer & TypedDataSigner;

export type ConnectorEventValues = {
  signerChanged: TypedSigner;
  chainChanged: number;
  accountsChanged: string[];
  disconnect: void;
};

export interface Connector {
  type: string;
  getSigner(): TypedSigner | null;
  getAccounts(): string[];
  getChainId(): number | null;
  switch(param: ChainParameter): void | Promise<void>;
  on<T extends ConnectorEvents>(
    event: T,
    listener: (value: ConnectorEventValues[T]) => void
  ): void;
}
