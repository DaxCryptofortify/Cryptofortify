chrome.runtime.onInstalled.addListener(() => {
    console.log('Background service worker installed.');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "CONNECT_PHANTOM") {
      try {
        const { solana } = window;
        if (solana && solana.isPhantom) {
          solana.connect().then(() => {
            sendResponse({ status: 'connected', publicKey: solana.publicKey.toString() });
          }).catch((err) => {
            sendResponse({ status: 'disconnected', error: err.toString() });
          });
        } else {
          sendResponse({ status: 'not_found' });
        }
      } catch (err) {
        sendResponse({ status: 'error', error: err.toString() });
      }
      return true; 
    }
  });
  