import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles";

const tagName = "inquiry-footer";

@customElement(tagName)
export class InquiryFooter extends LitElement {
  static styles?: CSSResultGroup | undefined = [
    globalStyles,
    css`
      div {
        display: flex;
        flex-direction: column;
        margin: 8rem auto;
      }

      h1 {
        text-align: center;
        padding-bottom: 1rem;
        border-bottom: 2px solid #372c2e63;
      }

      a {
        color: white;
        background-color: #372c2e;
        border: 1px solid #372c2e;
        border-radius: 8px;
        width: 80%;
        margin: 2rem auto 2rem auto;
        text-align: center;
        padding: 2rem 0;
        cursor: pointer;
        user-select: none;
      }

      a:hover {
        background-color: #563727;
        border: 1px solid #563727;
      }
    `,
  ];

  render() {
    return html` <div>
      <h1>お問い合わせ</h1>

      <a href="/inquiry">お問い合せはこちら</a>
    </div>`;
  }
}
