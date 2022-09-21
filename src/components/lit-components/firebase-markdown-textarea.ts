import { app } from "@firebase/index";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { generateRandomText, loadComponent } from "./helpers";
import { MarkdownTextarea } from "./inheritable/markdown-textarea";
import {
  tagName as pictureIconTag,
  NewPictureIcon,
} from "./icons/new-picture-icon";
import { tagName as loadingIconTagName, LoadingIcon } from "./loading-icon";

export const tagName = "firebase-markdown-textarea";

@customElement(tagName)
export class FirebaseMarkdownTextarea extends MarkdownTextarea {
  private storage: ReturnType<typeof getStorage>;
  @query("input#add-file")
  private fileInput!: HTMLInputElement;
  @state()
  private loading = false;

  constructor() {
    super();
    this.storage = getStorage(app);
    loadComponent(pictureIconTag, NewPictureIcon);
    loadComponent(loadingIconTagName, LoadingIcon);
  }

  private handleAddPictureClick: EventListener = () => {
    if (this.loading) return;
    this.fileInput.click();
  };

  private handleFileInput: EventListener = () => {
    const file = this.fileInput.files![0];
    if (!file || file.size === 0) return;
    const key = `${Date.now()}-${generateRandomText()}-${file.name}`;
    const storageRef = ref(this.storage, `images/${key}`);
    this.loading = true;
    uploadBytes(storageRef, file)
      .then(result => {
        const { fullPath } = result.metadata;
        const newImageRef = ref(this.storage, fullPath);
        return getDownloadURL(newImageRef);
      })
      .then(url => {
        const markdown = `![${file.name}](${url} "${key}")`;
        const { selectionStart, selectionEnd, value } = this.textarea;
        const textUntilSelectionStart = value.substring(0, selectionStart);
        const textAfterSelectionEnd = value.substring(selectionEnd);
        const newLine = "\n";
        this.textarea.value =
          textUntilSelectionStart +
          newLine +
          markdown +
          textAfterSelectionEnd +
          newLine;
        this.triggerInputEvent();
      })
      .finally(() => {
        this.loading = false;
      });
  };

  render() {
    return html`
      <input
        @input=${this.handleFileInput}
        id="add-file"
        type="file"
        hidden
        accept="image/png, image/jpeg"
      />
      <nav>
        <ul>
          <li @click=${this.handleHeaderClick} id="h1">H1</li>
          <li @click=${this.handleHeaderClick} id="h2">H2</li>
          <li @click=${this.handleHeaderClick} id="h3">H3</li>
          <li @click=${this.handleHeaderClick} id="h4">H4</li>
          <li @click=${this.handleHeaderClick} id="h5">H5</li>
          <li @click=${this.handleModifierClick} id="i"><em>i</em></li>
          <li @click=${this.handleModifierClick} id="b"><strong>B</strong></li>
          <li @click=${this.handleTemplateClick} id="table">
            <table-icon></table-icon>
          </li>
          <li @click=${this.handleTemplateClick} id="link">
            <link-icon></link-icon>
          </li>
          <li @click=${this.handleAddPictureClick} style="position: relative;">
            ${this.loading
              ? html`<loading-icon small black></loading-icon>`
              : html`<new-picture-icon></new-picture-icon>`}
          </li>
        </ul>
      </nav>
      <textarea
        name=${this.name}
        autocomplete="off"
        maxlength="5000"
      ></textarea>
      <slot name="input"></slot>
    `;
  }
}
