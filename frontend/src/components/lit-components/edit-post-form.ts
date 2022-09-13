import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import type { PostServerModel } from "../../../types/post-model";
import GenericPostForm, { Payload } from "./generic-post-form";
import { BaseModal, tagName as baseModalTagName } from "./base-modal";

const tagName = "edit-post-form";

@customElement(tagName)
export class EditPostForm extends GenericPostForm {
  @property({ attribute: "post-id" })
  private postId = 0;
  @query("input#title")
  private titleInput!: HTMLInputElement;
  @query("textarea")
  private bodyInput!: HTMLTextAreaElement;
  @query("base-modal")
  private baseModal!: BaseModal;

  constructor() {
    super();
    if (!window.customElements.get(baseModalTagName)) {
      window.customElements.define(baseModalTagName, BaseModal);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    fetch(`${this.apiPath}/posts/${this.postId}`)
      .then(response => response.json())
      .then((data: PostServerModel) => {
        this.titleInput.value = data.title;
        this.bodyInput.textContent = data.body;
        const fileFormat = data.picture?.charAt(0) === "/" ? "jpeg" : "png";
        const formattedImageString = `data:image/${fileFormat};base64,${data.picture}`;
        this.imagePreview.src = data.picture ? formattedImageString : "";
      });
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
    };
    const image = formData.get("image");
    if (image instanceof File) {
      if (image.size > 1024 * 500)
        return (this.error = "画像サイズは500KBまで");
      const imageDataString = await this.readImageAsB64(image);
      payload.picture = imageDataString.split(",")[1];
    }
    const result = await fetch(`${this.apiPath}/posts/${this.postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!result.ok)
      throw Error(
        `Inquiry Fetch Failed: ${result.status} ${result.statusText}`
      );

    const data = await result.json();
    this.error = "";
    this.loading = false;

    const id: string = data.id;
    const redirectUrl = new URL(window.location.href);
    redirectUrl.pathname = `/blog/${id}`;
    redirectUrl.searchParams.set("admin", "1");
    window.location.href = redirectUrl.toString();
  };

  private handleDeleteClick: EventListener = () => {
    this.baseModal.toggleAttribute("show", true);
  };

  private handleDeleteConfirmClick: EventListener = () => {
    fetch(`${this.apiPath}/posts/${this.postId}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      const redirectUrl = new URL(window.location.href);
      redirectUrl.pathname = "/blog";
      redirectUrl.searchParams.set("admin", "1");
      window.location.href = redirectUrl.toString();
    });
  };

  static styles = [
    ...GenericPostForm.styles,
    css`
      .delete {
        --warning: #ff5454;
        background-color: var(--warning);
        border-color: var(--warning);
      }
    `,
  ];

  render() {
    return html` ${this.error
        ? html`<div style="color: red; text-align: center;">${this.error}</div>`
        : ""}
      <base-modal modal-title="本当にこの投稿を削除しますか？">
        <button
          id="delete-confirm"
          class="delete"
          type="button"
          @click=${this.handleDeleteConfirmClick}
        >
          削除
        </button></base-modal
      >
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
          ${this.loading ? html`<loading-spinner></loading-spinner>` : "編集"}
        </button>
        <button class="delete" type="button" @click=${this.handleDeleteClick}>
          削除
        </button>
      </form>`;
  }
}
