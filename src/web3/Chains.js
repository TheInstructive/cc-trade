export const cronosMainnet = {
  id: 25,
  name: 'Cronos',
  network: 'cronos',
  nativeCurrency: {
    decimals: 18,
    name: 'Cronos',
    symbol: 'CRO',
  },
  rpcUrls: {
    default: { http: ['https://evm.cronos.org'] },
    public: { http: ['https://evm.cronos.org'] },
  },
  blockExplorers: {
    cronoscan: { name: 'CronoScan', url: 'https://cronoscan.com' },
    default: { name: 'CronoScan', url: 'https://cronoscan.com' },
  },
}

export const cronosTestnet = {
  id: 338,
  name: 'Cronos Testnet',
  network: 'cronos testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Cronos Testnet',
    symbol: 'TCRO',
  },
  rpcUrls: {
    default: { http: ['https://evm-t3.cronos.org'] },
    public: { http: ['https://evm-t3.cronos.org'] },
  },
  blockExplorers: {
    cronoscan: { name: 'CronoScan', url: 'https://testnet.cronoscan.com' },
    default: { name: 'CronoScan', url: 'https://testnet.cronoscan.com' },
  },
}

export const localNet = {
  id: 1337,
  name: 'Private',
  network: 'private',
  nativeCurrency: {
    decimals: 18,
    name: 'Private',
    symbol: 'PRVT',
  },
  rpcUrls: {
    default: { http: ['http://10.2.0.50:8545'] },
    public: { http: ['http://10.2.0.50:8545'] },
  },
}

export default cronosMainnet;
