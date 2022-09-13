import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles";

const tagName = "image-card";

@customElement(tagName)
export class ImageCard extends LitElement {
  @property({ attribute: "src" })
  private src = "";
  @property({ attribute: "class" })
  private class = "";

  static styles = [
    globalStyles,
    css`
      div {
        width: 90%;
        border: 1px solid white;
        border-radius: 4px;
        background-color: white;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.137);
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 4rem auto;
      }

      img {
        max-width: 100%;
      }

      .image-section {
        flex: 60%;
        position: relative;
      }
      .image-section img {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      .text-section {
        flex: 35%;
        padding: 2rem 0 2rem 0;
        color: #372c2e;
        text-align: center;
      }

      .small {
        max-width: 250px;
        margin: 1rem auto;
        border-radius: 8px;
        padding: 2rem;
      }

      .small img {
        border-radius: 50%;
      }
    `,
  ];

  render() {
    return html` <div class=${this.class}>
      <section class="image-section">
        <img src=${this.src} />
      </section>
      <section class="text-section"><slot></slot></section>
    </div>`;
  }
}
