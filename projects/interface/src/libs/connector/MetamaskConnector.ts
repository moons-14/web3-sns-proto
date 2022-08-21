import detectEthereumProvider from "@metamask/detect-provider";
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
export class MetamaskConnector implements Connector {
  private listeners: {
    [key in ConnectorEvents]: ((value: ConnectorEventValues[key]) => void)[];
  } = {
    signerChanged: [],
    chainChanged: [],
    accountsChanged: [],
    disconnect: [],
  };

  constructor(
    private eip1193: EIP1193,
    private accounts: string[],
    private chainId: number
  ) {
    eip1193.on("accountsChanged", (accounts) => {
      this._runListeners("accountsChanged")(accounts);
      this._runListeners("signerChanged")(this.getSigner());
      accounts.length === 0 && this._runListeners("disconnect")(undefined);
    });
    eip1193.on("chainChanged", (chainId) =>
      this._runListeners("chainChanged")(parseChainId(chainId))
    );
    eip1193.on("disconnect", () => this._runListeners("disconnect")(undefined));
  }

  private _runListeners<T extends ConnectorEvents>(event: T) {
    return (value: ConnectorEventValues[T]) =>
      this.listeners[event].forEach((listener) => listener(value));
  }

  static async connect() {
    const eip1193 = (await detectEthereumProvider()) as EIP1193;
    invariant(eip1193 && eip1193?.request, "Unauthorized Wallet");

    const [chainId, accounts] = (await Promise.all([
      eip1193.request({ method: "eth_chainId" }),
      eip1193.request({ method: "eth_requestAccounts" }),
    ])) as [string, string[]];

    invariant(eip1193 && chainId && accounts.length > 0, "Unauthorized Wallet");
    return new MetamaskConnector(eip1193, accounts, parseChainId(chainId));
  }

  on<T extends ConnectorEvents>(
    event: T,
    listener: (e: ConnectorEventValues[T]) => void
  ) {
    this.listeners[event].push(listener);
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
