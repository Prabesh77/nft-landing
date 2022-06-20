import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [56, 97]
});

const walletconnect = new WalletConnectConnector({
  infuraId: process.env.INFURA_KEY,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  url: process.env.APP_ENV === 'dev' ? 'https://data-seed-prebsc-1-s3.binance.org:8545' : 'https://bsc-dataseed.binance.org/',
  appName: "starter"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};
