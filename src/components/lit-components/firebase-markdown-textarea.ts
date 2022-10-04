import { app } from "@firebase/index";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { customElement } from "lit/decorators.js";
import { generateRandomText } from "./helpers";
import { LitMarkdownEditor } from "lit-markdown-editor";

export const tagName = "firebase-markdown-textarea";

@customElement(tagName)
export class FirebaseMarkdownTextarea extends LitMarkdownEditor {
  private storage: ReturnType<typeof getStorage>;

  constructor() {
    super();
    this.storage = getStorage(app);
  }

  protected provideFileURL(file: File): Promise<string> {
    const key = `${Date.now()}-${generateRandomText()}-${file.name}`;
    const storageRef = ref(this.storage, `images/${key}`);
    return uploadBytes(storageRef, file).then(result => {
      const { fullPath } = result.metadata;
      const newImageRef = ref(this.storage, fullPath);
      return getDownloadURL(newImageRef);
    });
  }
}
