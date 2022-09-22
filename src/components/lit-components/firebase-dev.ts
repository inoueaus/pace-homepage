import { app } from "@firebase/index";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

export const tagName = "firebase-dev";

@customElement(tagName)
export class FirebaseDev extends LitElement {
  connectedCallback() {
    if (!this.isConnected) return;
    connectAuthEmulator(getAuth(app), "http://localhost:9099");
    connectDatabaseEmulator(getDatabase(app), "localhost", 9000);
    connectStorageEmulator(getStorage(app), "localhost", 9199);
  }
}
