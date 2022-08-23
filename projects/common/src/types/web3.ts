export type ChainParameter = Readonly<{
  chainId: number;
  blockExplorerUrls: string[];
  chainName: string;
  iconUrls: string[];
  nativeCurrency: {
    decimals: 18;
    name: string;
    symbol: string;
  };
  rpcUrls: string[];
}>;

export type chains = 592;

export type ChainParameters = Record<chains, ChainParameter>;
