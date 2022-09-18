import { app } from "@firebase/index";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { LitElement } from "lit";

class FirebaseElement extends LitElement {
  protected db: ReturnType<typeof getDatabase>;
  protected storage: ReturnType<typeof getStorage>;

  constructor() {
    super();
    this.db = getDatabase(app);
    this.storage = getStorage(app);
  }
}

export default FirebaseElement;
