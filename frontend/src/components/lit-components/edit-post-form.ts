import { css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { PostServerModel } from "../../../types/post-model";
import GenericPostForm, { Payload } from "./generic-post-form";
import { get, ref, set } from "firebase/database";
import type { BaseModal } from "./base-modal";

const tagName = "edit-post-form";

@customElement(tagName)
export class EditPostForm extends GenericPostForm {
  private postId = "";
  private postRef!: ReturnType<typeof ref>;
  @query("input#title")
  private titleInput!: HTMLInputElement;
  @query("textarea")
  private bodyInput!: HTMLTextAreaElement;
  @query("base-modal")
  private baseModal!: BaseModal;
  @state()
  private loadingData = true;
  @state()
  private post: PostServerModel = {
    title: "",
    body: "",
    createdAt: 0,
    updatedAt: 0,
    picture: "",
  };

  connectedCallback(): void {
    super.connectedCallback();
    const { searchParams } = new URL(window.location.href);
    this.postId = searchParams.get("post-id") ?? "";
    if (!this.postId) throw Error("Post ID not provided");
    this.postRef = ref(this.db, `/posts/${this.postId}`);
    get(this.postRef)
      .then(snapshot => {
        this.post = snapshot.val();
        this.titleInput.value = this.post.title;
        this.bodyInput.textContent = this.post.body;
        const fileFormat = this.post.picture.charAt(0) === "/" ? "jpeg" : "png";
        this.imagePreview.src = this.post.picture
          ? `data:image/${fileFormat};base64,${this.post.picture}`
          : "";
      })
      .finally(() => (this.loadingData = false));
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
      updatedAt: Date.now(),
      createdAt: this.post.createdAt,
      picture: this.post.picture,
    };
    const image = formData.get("image");
    if (image instanceof File && image.size) {
      if (image.size > 1024 * 500)
        return (this.error = "画像サイズは500KBまで");
      const imageDataString = await this.readImageAsB64(image);
      payload.picture = imageDataString.split(",")[1];
    }
    set(this.postRef, payload)
      .then(() => {
        this.error = "";
        const redirectUrl = new URL(window.location.href);
        redirectUrl.pathname = "/blog";
        redirectUrl.searchParams.set("admin", "1");
        window.location.href = redirectUrl.toString();
      })
      .catch(error => {
        if (!(error instanceof Error)) return;
        this.error = error.message;
      })
      .finally(() => {
        this.loading = false;
      });
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
      ${this.loadingData ? html`<loading-icon></loading-icon>` : ""}
      <form @submit=${this.handleSubmit}>
        <div>
          <label htmlFor="username">タイトル</label>
          <input
            id="title"
            name="title"
            autocomplete="off"
            type="text"
            .value=${this.post.title}
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
          ${this.loading ? html`<loading-icon small></loading-icon>` : "編集"}
        </button>
        <button class="delete" type="button" @click=${this.handleDeleteClick}>
          削除
        </button>
      </form>`;
  }
}
