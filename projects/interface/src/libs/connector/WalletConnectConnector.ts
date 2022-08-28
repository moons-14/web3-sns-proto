import { chainParameters } from "@crypteen/common";
import type WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

import type {
  Connector,
  ConnectorEvents,
  ConnectorEventValues,
  EIP1193,
} from "./types";

import { invariant, parseChainId } from "@/utils";

/**
 * @dev Metamaskを使ってwalletに接続する
 */
export class WalletConnectConnector implements Connector {
  type = "WalletConnectConnector";

  private listeners: {
    [key in ConnectorEvents]: ((value: ConnectorEventValues[key]) => void)[];
  } = {
    signerChanged: [],
    chainChanged: [],
    accountsChanged: [],
    disconnect: [],
  };

  constructor(
    private eip1193: EIP1193 & WalletConnectProvider,
    private accounts: string[],
    private chainId: number
  ) {
    eip1193.on("accountsChanged", (accounts) => {
      this._runListeners("accountsChanged")(accounts);
      this._runListeners("signerChanged")(this.getSigner());
      accounts.length === 0 && this._runListeners("disconnect")();
    });
    eip1193.on("chainChanged", (chainId) =>
      this._runListeners("chainChanged")(parseChainId(chainId))
    );
    eip1193.on("disconnect", () => this._runListeners("disconnect")());
  }

  private _runListeners<T extends ConnectorEvents>(event: T) {
    return (value: ConnectorEventValues[T]) =>
      this.listeners[event].forEach((listener) => listener(value));
  }

  static async connect() {
    const { default: WalletConnectProvider } = await import(
      "@walletconnect/web3-provider"
    );
    const rpc: { [key in number]: string } = {};
    Object.values(chainParameters).forEach((param) => {
      rpc[param.chainId] = param.rpcUrls[0] || "";
    });
    const eip1193 = new WalletConnectProvider({
      rpc,
    }) as unknown as WalletConnectProvider & EIP1193;
    await eip1193.enable();
    invariant(eip1193.connected);

    return new WalletConnectConnector(
      eip1193,
      eip1193.accounts,
      eip1193.chainId
    );
  }

  switch() {
    /**cannot switch maybe */
  }

  on<T extends ConnectorEvents>(
    event: T,
    listener: (e: ConnectorEventValues[T]) => void
  ) {
    this.listeners[event].push(listener);
    switch (event) {
      case "accountsChanged":
        return listener(this.accounts as never);
      case "chainChanged":
        return listener(this.chainId as never);
      case "signerChanged":
        return listener(this.getSigner() as never);
    }
  }

  getSigner() {
    return new providers.Web3Provider(this.eip1193).getSigner();
  }

  getAccounts() {
    return this.accounts;
  }

  getChainId(): number | null {
    return this.chainId;
  }
}
