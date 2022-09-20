import { app } from "@firebase/index";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { loadComponent } from "./helpers";
import { MarkdownTextarea } from "./inheritable/markdown-textarea";
import {
  tagName as pictureIconTag,
  NewPictureIcon,
} from "./icons/new-picture-icon";

export const tagName = "firebase-markdown-textarea";

@customElement(tagName)
export class FirebaseMarkdownTextarea extends MarkdownTextarea {
  private db: ReturnType<typeof getDatabase>;
  private storage: ReturnType<typeof getStorage>;
  @query("input#add-file")
  private fileInput!: HTMLInputElement;

  constructor() {
    super();
    this.db = getDatabase(app);
    this.storage = getStorage(app);
    loadComponent(pictureIconTag, NewPictureIcon);
  }

  private handleAddPictureClick: EventListener = () => {
    this.fileInput.click();
  };

  private handleFileInput: EventListener = () => {
    const file = this.fileInput.files![0];
    if (!file) return;
    console.log(file);
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
          <li @click=${this.handleAddPictureClick}>
            <new-picture-icon></new-picture-icon>
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
