import { app } from "@firebase/index";
import { getDatabase } from "firebase/database";
import { LitElement } from "lit";

class FirebaseDbElement extends LitElement {
  protected db: ReturnType<typeof getDatabase>;

  constructor() {
    super();
    this.db = getDatabase(app);
  }
}

export default FirebaseDbElement;
