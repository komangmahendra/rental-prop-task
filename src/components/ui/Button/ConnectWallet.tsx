import { error } from 'console';
import { useConnectWallet } from '../../../hooks/useConnectWallet';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const ConnectWallet = () => {
  const { wallet, handleConnectWallet, handleDisconnectWallet, formatAddress } = useConnectWallet();


  return (
    <div style={{ textAlign: 'center' }}>
      {wallet.address && (
        <div
          style={{
            marginBottom: '10px',
            fontSize: '14px',
            color: '#666',
          }}
        >
          <div style={{ marginBottom: '5px' }}>
            Balance: <strong>{wallet.balance} ETH</strong>
          </div>
        </div>
      )}

      {wallet.error && (
        <div
          style={{
            maxWidth: '200px',
            marginBottom: '10px',
            fontSize: '12px',
            color: '#d32f2f',
          }}
        >
          {wallet.error}
        </div>
      )}

      {wallet.address ? (
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
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
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Disconnect
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
  );
}