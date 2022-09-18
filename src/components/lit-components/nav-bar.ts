import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles";

const tagName = "nav-bar";

@customElement(tagName)
export class NavBar extends LitElement {
  #links = [
    { title: "法人説明", link: "/about" },
    { title: "ブログ", link: "/blog" },
    { title: "お問い合わせ", link: "/inquiry" },
  ];

  static styles = [
    globalStyles,
    css`
      nav {
        display: flex;
        background-color: #372c2e;
        flex-direction: row;
        justify-content: space-between;
        user-select: none;
      }

      #home-link {
        flex: 20%;
        color: #ffffff;
        font-size: x-large;
        text-align: center;
        margin: auto 0 auto 0;
        cursor: pointer;
      }

      nav ul {
        display: flex;
        background-color: #372c2e;
        flex-direction: row;
        justify-content: center;
        list-style-type: none;
        width: 100%;
        margin: 0;
        padding: 1rem;
        overflow-x: scroll;
        flex: 80%;
      }

      nav li {
        color: #ffffff;
        margin: auto;
        cursor: pointer;
      }
    `,
  ];

  render() {
    return html`
      <nav>
        <a id="home-link" href="/">
          <section>Pace</section>
        </a>
        <ul>
          ${this.#links.map(
            link =>
              html` <li>
                <a href=${link.link}>${link.title}</a>
              </li>`
          )}
        </ul>
      </nav>
    `;
  }
}
