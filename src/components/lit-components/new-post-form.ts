import { push, ref as databaseRef } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { html, PropertyValueMap } from "lit";
import { customElement, query } from "lit/decorators.js";
import GenericPostForm, { Payload } from "./generic-post-form";
import { resolveMarkdown } from "./directives/markdown-renderer";

const tagName = "new-post-form";

@customElement(tagName)
export class NewPostForm extends GenericPostForm {
  @query("firebase-markdown-textarea")
  private textarea!: HTMLTextAreaElement;

  firstUpdated(
    _changedProps: PropertyValueMap<unknown> | Map<PropertyKey, unknown>
  ) {
    super.firstUpdated(_changedProps);
    this.textarea.addEventListener("input", this.handleTextareaInput);
  }

  private handleSubmit: EventListener = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement))
      throw TypeError("Listener must be used with form.");
    this.error = "";
    this.loading = true;
    const formData = new FormData(form);
    const title = formData.get("title")!.toString().trim();
    const body = formData.get("body")!.toString().trim();
    const image = formData.get("image");
    if (!(image instanceof File)) return;
    if (image.size > 1024 * 500) return (this.error = "画像サイズは500KBまで");
    const hasImage = Boolean(image.size);
    const payload: Payload = {
      title,
      body,
      picture: hasImage ? String(Date.now()) + image.name : "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    Promise.all([
      push(databaseRef(this.db, "/posts"), payload),
      new Promise(resolve => {
        if (!hasImage) return resolve(true);
        uploadBytes(
          storageRef(this.storage, `images/${payload.picture}`),
          image
        ).then(result => resolve(result));
      }),
    ])
      .then(() => {
        this.error = "";
        this.loading = false;
        const redirectUrl = new URL(window.location.href);
        redirectUrl.pathname = "/blog";
        redirectUrl.searchParams.set("admin", "1");
        window.location.href = redirectUrl.toString();
      })
      .catch(error => {
        if (!(error instanceof Error)) return;
        this.error = error.message;
      });
  };

  render() {
    return html`${this.error
        ? html`<div style="color: red; text-align: center;">${this.error}</div>`
        : ""}
      <form @submit=${this.handleSubmit}>
        <div>
          <label htmlFor="username">タイトル</label>
          <input
            id="title"
            name="title"
            autocomplete="off"
            type="text"
            maxlength="255"
            minlength="2"
            required
          />
        </div>
        <div>
          <label id="body-label" for="body">内容</label>
          <firebase-markdown-textarea
            id="body"
            aria-describedby="body-label"
            name="body"
            required
          ></firebase-markdown-textarea>
          ${this.raw
            ? html`<h3 class="bottom-border">プレビュー</h3>
                <article id="preview" class="bottom-border">
                  ${this.isConnected ? resolveMarkdown(this.raw) : this.raw}
                </article>`
            : ""}
        </div>
        <div>
          <label id="image-label" for="image">アイコン画像</label>
          <img id="icon-preview" aria-describedby="image-label" />
          <label class="file-label">
            ${this.fileName ? this.fileName : "ファイルを選択"}
            <input
              name="image"
              id="image"
              type="file"
              @input=${this.handleFileSelection}
              accept="image/png, image/jpeg"
            />
          </label>
        </div>
        <button type="submit">
          ${this.loading ? html`<loading-icon small></loading-icon>` : "作成"}
        </button>
      </form>`;
  }
}
