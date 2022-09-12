import { css, html, LitElement } from "lit";
import { state, customElement, property, query } from "lit/decorators.js";
import { globalStyles } from "./styles";
import formStyles from "./styles/form";

const tagName = "new-post-form";

@customElement(tagName)
export class NewPostForm extends LitElement {
  @property({ attribute: "api-path" })
  private apiPath = "";
  @state()
  private fileName = "";
  @state()
  private error = "";
  @state()
  private loading = false;
  @query("img")
  private imagePreview!: HTMLImageElement;

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
    if (!(image instanceof File))
      throw TypeError("Image input was must be a file input.");
    if (image.size > 1024 * 500) return (this.error = "画像サイズは500KBまで");
    const imageB64 = await this.readImageAsB64(image);
    const result = await fetch(`${this.apiPath}/posts/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, body, picture: imageB64.split(",")[1] }),
    });

    if (!result.ok)
      return (this.error = `Inquiry Fetch Failed: ${result.status} ${result.statusText}`);
    const data = await result.json();
    this.error = "";
    this.loading = false;

    const id: string = data.id;
    const redirectUrl = new URL(window.location.href);
    redirectUrl.pathname = `/blog/${id}`;
    redirectUrl.searchParams.set("admin", "1");
    window.location.href = redirectUrl.toString();
  };

  private readImageAsB64(image: File) {
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

  private handleFileSelection: EventListener = event => {
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

  static styles = [
    globalStyles,
    formStyles,
    css`
      img[src] {
        max-width: 100%;
        margin: 1rem;
      }
    `,
  ];

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
