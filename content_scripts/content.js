chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'CONNECT_PHANTOM') {
      const isPhantomInstalled = window.phantom?.solana?.isPhantom;
      if (isPhantomInstalled) {
        window.phantom.solana.connect({ onlyIfTrusted: true })
          .then((response) => {
            sendResponse({
              status: 'connected',
              publicKey: response.publicKey.toString()
            });
          })
          .catch((error) => {
            sendResponse({ status: 'error', error: error.message });
          });
      } else {
        sendResponse({ status: 'not_installed' });
      }
      return true; 
    }
  });
  
