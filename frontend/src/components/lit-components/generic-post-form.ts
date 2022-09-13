import { css, LitElement } from "lit";
import { state, property, query } from "lit/decorators.js";
import { globalStyles } from "./styles";
import formStyles from "./styles/form";

export type Payload = { title: string; body: string; picture?: string };

class GenericPostForm extends LitElement {
  @property({ attribute: "api-path" })
  protected apiPath = "";
  @state()
  protected fileName = "";
  @state()
  protected error = "";
  @state()
  protected loading = false;
  @query("img")
  protected imagePreview!: HTMLImageElement;

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
}

export default GenericPostForm;
