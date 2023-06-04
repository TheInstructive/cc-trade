import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';

export const RockXProvider = () => jsonRpcProvider({
  rpc: (chain) => chain.id === 25 ? ({
    http: 'https://cronos.w3node.com/c192092deb4be58a0eb185f74b88e7fd98a1d4016f79fd1fe2e9e6b970f5a619/api',
  }) : (chain.id === 338 ? ({
    http: 'https://testnet-cronos.w3node.com/5cb56c2c112162d9695e80b24f20e17f34d78b5266c8d79635764a51110e35d7/api',
  }) : {
    http: 'http://localhost'
  })
});

export const VVSProvider = () => jsonRpcProvider({
  rpc: (chain) => chain.id === 25 ? ({
    http: 'https://rpc.vvs.finance/',
  }) : (chain.id === 338 ? ({
    http: 'https://localhost',
  }) : {
    http: 'http://localhost'
  })
});
