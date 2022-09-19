import { push, ref as databaseRef } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { html, PropertyValueMap } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import GenericPostForm, { Payload } from "./generic-post-form";
import { loadComponent } from "./helpers";
import { resolveMarkdown } from "./directives/markdown-renderer";

const tagName = "new-post-form";

@customElement(tagName)
export class NewPostForm extends GenericPostForm {
  @state()
  private raw = "";
  private timer = setTimeout(() => {});
  @query("textarea")
  private textarea!: HTMLTextAreaElement;

  firstUpdated(
    _changedProps: PropertyValueMap<any> | Map<PropertyKey, unknown>
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
    const payload: Payload = {
      title,
      body,
      picture: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const image = formData.get("image");
    if (!(image instanceof File)) return;
    if (image.size > 1024 * 500) return (this.error = "画像サイズは500KBまで");
    const hasImage = Boolean(image.size);
    payload.picture = hasImage ? String(Date.now()) + image.name : "";
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

  private handleTextareaInput: EventListener = event => {
    clearTimeout(this.timer);
    const textarea = event.currentTarget;
    if (!(textarea instanceof HTMLTextAreaElement)) throw TypeError();
    const raw = textarea.value.trim();
    this.timer = setTimeout(() => {
      this.raw = raw;
    }, 1000);
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
          <h3>プレビュー</h3>
          <article id="preview">
            ${this.isConnected && resolveMarkdown(this.raw)}
          </article>
        </div>
        <div>
          <label for="body">内容</label>
          <textarea
            id="body"
            name="body"
            autocomplete="off"
            required
            maxlength="5000"
          ></textarea>
        </div>
        <div>
          <label id="image-label" for="image">画像</label>
          <img aria-describedby="image-label" />
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
