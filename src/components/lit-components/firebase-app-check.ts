import { app } from "@firebase/index";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { getAnalytics, logEvent } from "firebase/analytics";

export const tagName = "firebase-app-check";

@customElement(tagName)
export class FirebaseAppCheck extends LitElement {
  connectedCallback() {
    if (!this.isConnected) return;
    //@ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        "6LeQYZcgAAAAAIfC-VUXxtTbusQsNpqJuPtS92S9"
      ),
      isTokenAutoRefreshEnabled: true,
    });
    const analytics = getAnalytics(app);
    logEvent(analytics, "page_view");
  }
}
