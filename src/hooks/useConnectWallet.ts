import {useState, useEffect} from 'react';
import { toast } from 'react-toastify';

interface WalletState {
  address: string | null;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;
  errorCode?: "METAMASK_NOT_INSTALLED" | "CONNECTION_REJECTED" | "UNKNOWN_ERROR" | "FETCH_BALANCE_FAILED" | "REQ_PERMISSION_PENDING" | "";
}

const errorMessages = {
  METAMASK_NOT_INSTALLED: 'MetaMask is not installed. Please install it to continue.',
  CONNECTION_REJECTED: 'Connection request was rejected by the user.',
  REQ_PERMISSION_PENDING: 'A connection request is already pending. Please check your MetaMask extension.',
  FETCH_BALANCE_FAILED: 'Failed to fetch wallet balance.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
}

export const useConnectWallet = () => {
    const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    isConnecting: false,
    error: null,
    errorCode: ''
  });

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnectedWallet = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });

          if (accounts.length > 0) {
            const address = accounts[0];
            setWallet((prev) => ({ ...prev, address }));
            await fetchBalance(address);
          }
        } catch (err) {
          console.error('Error checking connected wallet:', err);
        }
      }
    };

    checkConnectedWallet();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          setWallet({
            address: null,
            balance: null,
            isConnecting: false,
            error: null,
          });
        } else {
          // User switched accounts
          const address = accounts[0];
          setWallet((prev) => ({ ...prev, address }));
          fetchBalance(address);
        }
      });

      window.ethereum.on('chainChanged', () => {
        // Reload page on chain change
        window.location.reload();
      });

      return () => {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      };
    }
  }, []);

  const fetchBalance = async (address: string) => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });

      // Convert from Wei to ETH
      const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);
      setWallet((prev) => ({ ...prev, balance: ethBalance }));
    } catch (err) {
      console.error('Error fetching balance:', err);
      setWallet((prev) => ({
        ...prev,
        error: 'Failed to fetch balance',
        errorCode: 'FETCH_BALANCE_FAILED'
      }));
    }
  };

  const handleConnectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      toast.error('MetaMask is not installed. Please install it to continue.');
      return;
    }

    try {
      setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];
      setWallet((prev) => ({
        ...prev,
        address,
        isConnecting: false,
        error: null,
        errorCode: '',
      }));

      await fetchBalance(address);
    } catch (err: any) {
      console.log(err)
      const errorCode = err.code === -32002 ? 'REQ_PERMISSION_PENDING' :
        err.code === 4001 ? 'CONNECTION_REJECTED' : 'UNKNOWN_ERROR';
      const errorMessage = errorMessages[errorCode as keyof typeof errorMessages];
      
      toast.error(errorMessage);
      
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
      }));
    }
  };

  const handleDisconnectWallet = () => {
    setWallet({
      address: null,
      balance: null,
      isConnecting: false,
      error: null,
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    wallet,
    handleConnectWallet,
    handleDisconnectWallet,
    formatAddress,
  }
}