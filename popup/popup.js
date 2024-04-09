document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById('connect-wallet');
    const statusIndicator = document.getElementById('status-indicator');
  
    connectWalletButton.addEventListener('click', async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          await window.solana.connect({ onlyIfTrusted: true });
          statusIndicator.textContent = 'Connected';
          statusIndicator.style.color = 'green';
        } catch (error) {
          console.error('Connection failed', error);
          statusIndicator.textContent = 'Connection failed';
          statusIndicator.style.color = 'red';
        }
      } else {
        statusIndicator.textContent = 'Phantom wallet not found';
        statusIndicator.style.color = 'red';
        window.open('https://phantom.app/', '_blank');
      }
    });
});
