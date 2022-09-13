import { html } from "lit";
import { customElement } from "lit/decorators.js";
import GenericPostForm, { Payload } from "./generic-post-form";

const tagName = "new-post-form";

@customElement(tagName)
export class NewPostForm extends GenericPostForm {
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
    const result = await fetch(`${this.apiPath}/posts/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!result.ok)
      return (this.error = `Inquiry Fetch Failed: ${result.status} ${result.statusText}`);
    this.error = "";
    this.loading = false;
    const redirectUrl = new URL(window.location.href);
    redirectUrl.pathname = "/blog";
    redirectUrl.searchParams.set("admin", "1");
    window.location.href = redirectUrl.toString();
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
          ${this.loading ? html`<loading-spinner></loading-spinner>` : "作成"}
        </button>
      </form>`;
  }
}
