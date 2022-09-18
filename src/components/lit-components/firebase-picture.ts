import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import FirebaseElement from "./firebase-element";

export const tagName = "firebase-picture";

@customElement(tagName)
export class FirebasePicture extends FirebaseElement {
  private ref!: ReturnType<typeof storageRef>;
  @property({ attribute: "image-name" })
  private imageName = "";
  @state()
  private src = "";

  connectedCallback() {
    super.connectedCallback();
    this.ref = storageRef(this.storage, `/images/${this.imageName}`);
    getDownloadURL(this.ref)
      .then(url => {
        this.src = url;
      })
      .catch(error => console.error(error));
  }

  static styles = [
    css`
      .picture-container {
        position: relative;
        width: 100%;
      }

      .picture-container span {
        position: relative !important;
      }

      .picture-container img {
        object-fit: contain;
        width: 100% !important;
        position: relative !important;
        height: unset !important;
      }
    `,
  ];

  render() {
    return html`
      <div class="picture-container">
        <img src=${this.src} />
      </div>
    `;
  }
}
