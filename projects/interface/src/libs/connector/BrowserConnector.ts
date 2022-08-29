import type { ChainParameter } from "@crypteen/common";
import { ethers } from "ethers";

import type { Connector, ConnectorEvents, ConnectorEventValues } from "./types";

import { invariant } from "@/utils";

/**
 * @dev Metamaskを使ってwalletに接続する
 */
export class BrowserConnector implements Connector {
  type = "BrowserConnector";

  private listeners: {
    [key in ConnectorEvents]: ((value: ConnectorEventValues[key]) => void)[];
  } = {
    signerChanged: [],
    chainChanged: [],
    accountsChanged: [],
    disconnect: [],
  };

  constructor(public wallet: ethers.Wallet, private chain: ChainParameter) {}

  private _runListeners<T extends ConnectorEvents>(event: T) {
    return (value: ConnectorEventValues[T]) =>
      this.listeners[event].forEach((listener) => listener(value));
  }

  static createWallet(chain: ChainParameter) {
    const wallet = ethers.Wallet.createRandom();
    return Promise.resolve(new BrowserConnector(wallet, chain));
  }

  static connect(seedPhrase: string, chain: ChainParameter) {
    const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
    return Promise.resolve(new BrowserConnector(wallet, chain));
  }

  switch(param: ChainParameter) {
    this.chain = param;
    this._runListeners("chainChanged")(this.chain.chainId);
    this._runListeners("signerChanged")(this.getSigner());
  }

  on<T extends ConnectorEvents>(
    event: T,
    listener: (e: ConnectorEventValues[T]) => void
  ) {
    this.listeners[event].push(listener);
    switch (event) {
      case "accountsChanged":
        return listener(this.getAccounts() as never);
      case "chainChanged":
        return listener(this.getChainId() as never);
      case "signerChanged":
        return listener(this.getSigner() as never);
    }
  }

  getSigner(): ethers.Wallet {
    const rpcUrl = this.chain.rpcUrls[0];
    invariant(rpcUrl);
    return this.wallet.connect(
      new ethers.providers.JsonRpcBatchProvider(rpcUrl)
    );
  }

  getAccounts() {
    return [this.wallet.address];
  }

  getChainId(): number | null {
    return this.chain.chainId;
  }
}
