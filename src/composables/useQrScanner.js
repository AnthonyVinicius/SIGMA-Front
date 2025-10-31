import { ref, nextTick } from "vue";
import { Html5QrcodeScanner } from "html5-qrcode";

export function useQrScanner(onSuccess, onFailure) {
  const isScanning = ref(false);
  let html5QrcodeScanner = null;

  async function start() {
    isScanning.value = true;
    await nextTick();
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [0],
    };
    html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", config, false);
    html5QrcodeScanner.render(onSuccess, onFailure);
  }

  async function stop() {
    if (html5QrcodeScanner) {
      try {
        await html5QrcodeScanner.clear();
      } finally {
        html5QrcodeScanner = null;
        isScanning.value = false;
      }
    }
  }

  return { isScanning, start, stop };
}
