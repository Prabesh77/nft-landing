import { ApolloClient, InMemoryCache } from '@apollo/client'

export const graphClient = new ApolloClient({
  uri: `https://api.thegraph.com/subgraphs/name/0xweb3builder/yieldclub-chapel-subgraph`,
  // fetchOptions: {
  //   mode: 'no-cors'
  // },
  cache: new InMemoryCache(),
})

export const ZERO = '0x0000000000000000000000000000000000000000'

export const addresses = {
  56: { // bsc mainnet
    YieldClub: '0x3DA8bfCf6d5644491B1B0d7227a0F5e81D13F80E',
    Owner: '0x6C99E56715D540080900837be43DFB57cd9e2F71',
  },
  97: { // bsc testnet
    YieldClub: '0x624Fac35c6Ce5c2DEE604510ef6968c0d4608513',
    Owner: '0x6C99E56715D540080900837be43DFB57cd9e2F71',
  },
}

export const NETWORKS = {
  56: {
    chainId: '0x38', // A 0x-prefixed hexadecimal string
    chainName: 'BSC Mainnet',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  97: {
    chainId: '0x61', // A 0x-prefixed hexadecimal string
    chainName: 'BSC Test Network',
    rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
}

export const poolBonuses = [
  3000,
  2000,
  1500,
  1000,
  1000,
  500,
  500,
  500,
]