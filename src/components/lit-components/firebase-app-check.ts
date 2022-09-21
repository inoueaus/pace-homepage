import { app } from "@firebase/index";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

export const tagName = "firebase-app-check";

declare const self: {
  FIREBASE_APPCHECK_DEBUG_TOKEN: boolean;
};

@customElement(tagName)
export class FirebaseAppCheck extends LitElement {
  connectedCallback() {
    if (!this.isConnected) return;
    const isDevelopment = this.dataset.mode === "development";

    if (isDevelopment) {
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        "6LeQYZcgAAAAAIfC-VUXxtTbusQsNpqJuPtS92S9"
      ),
      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true,
    });
  }
}
