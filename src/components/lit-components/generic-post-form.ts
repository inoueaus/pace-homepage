import { css } from "lit";
import { state, property, query } from "lit/decorators.js";
import FirebaseElement from "./firebase-element";
import { globalStyles } from "./styles";
import formStyles from "./styles/form";
import { BaseModal, tagName as baseModalTagName } from "./base-modal";
import { loadComponent } from "./helpers";
import { tagName as loadingIconTagName, LoadingIcon } from "./loading-icon";
import {
  tagName as markdownTextareaTag,
  FirebaseMarkdownTextarea,
} from "./firebase-markdown-textarea";
import { MarkdownTextarea } from "./inheritable/markdown-textarea";
import { markdownStyles } from "./styles/markdown";

export type Payload = {
  title: string;
  body: string;
  picture: string;
  createdAt: number;
  updatedAt: number;
};

class GenericPostForm extends FirebaseElement {
  @property({ attribute: "api-path" })
  protected apiPath = "";
  @state()
  protected fileName = "";
  @state()
  protected error = "";
  @state()
  protected loading = false;
  @state()
  protected raw = "";
  @query("img")
  protected imagePreview!: HTMLImageElement;
  private timer = setTimeout(() => 0);

  constructor() {
    super();
    loadComponent(baseModalTagName, BaseModal);
    loadComponent(loadingIconTagName, LoadingIcon);
    loadComponent(markdownTextareaTag, FirebaseMarkdownTextarea);
  }

  protected readImageAsB64(image: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("error", () => reject(reader.error), {
        once: true,
      });
      reader.addEventListener("load", () => {
        const result = reader.result;
        if (typeof result !== "string") throw TypeError();
        resolve(result);
      });

      reader.readAsDataURL(image);
    });
  }

  protected handleFileSelection: EventListener = event => {
    const fileInput = event.currentTarget;
    if (!(fileInput instanceof HTMLInputElement))
      throw TypeError("Listener must be used with Input");
    const files = fileInput.files;
    if (!(files && files.length)) return;
    const [image] = files;
    this.fileName = image.name;
    this.readImageAsB64(image).then(
      imageString => (this.imagePreview.src = imageString)
    );
  };

  protected handleTextareaInput: EventListener = event => {
    clearTimeout(this.timer);
    const textarea = event.currentTarget;
    if (
      !(
        textarea instanceof MarkdownTextarea ||
        textarea instanceof HTMLTextAreaElement ||
        textarea instanceof FirebaseMarkdownTextarea
      )
    )
      throw TypeError();
    const raw = textarea.value.trim();
    this.timer = setTimeout(() => {
      this.raw = raw;
    }, 2000);
  };

  static styles = [
    globalStyles,
    formStyles,
    markdownStyles,
    css`
      img#icon-preview {
        margin-bottom: 1rem;
      }

      h3,
      article {
        border-bottom: 1px solid var(--secondary-color);
      }
    `,
  ];
}

export default GenericPostForm;
