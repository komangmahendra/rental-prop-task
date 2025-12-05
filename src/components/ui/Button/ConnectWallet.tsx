import { useConnectWallet } from '../../../hooks/useConnectWallet';
import {  FiX } from 'react-icons/fi';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const ConnectWallet = () => {
  const { wallet, handleConnectWallet, handleDisconnectWallet, formatAddress } = useConnectWallet();

  return (
    <>
    <div style={{ textAlign: 'left' }}>
      {wallet.address && (
        <div
          style={{
            marginBottom: '8px',
            fontSize: '10px',
            color: '#fff',
          }}
        >
          <div >
            Balance: <strong>{wallet.balance} ETH</strong>
          </div>
        </div>
      )}

  
      {wallet.address ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            disabled={wallet.isConnecting}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: wallet.isConnecting ? 'not-allowed' : 'pointer',
              opacity: wallet.isConnecting ? 0.6 : 1,
            }}
            title={wallet.address}
          >
            {formatAddress(wallet.address)}
          </button>
          <button
            onClick={handleDisconnectWallet}
            style={{
              padding: '8px 12px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
            }}
            title="Disconnect wallet"
          >
            <FiX size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnectWallet}
          disabled={wallet.isConnecting}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: wallet.isConnecting ? 'not-allowed' : 'pointer',
            opacity: wallet.isConnecting ? 0.6 : 1,
          }}
        >
          {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
    </>
  );
}