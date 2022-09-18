import { checkAuthStatus } from "@firebase/helpers";
import { app } from "@firebase/index";
import { signOut, getAuth } from "firebase/auth";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles";

const tagName = "admin-nav-bar";

@customElement(tagName)
export class AdminNavBar extends LitElement {
  private controller = new AbortController();

  connectedCallback() {
    super.connectedCallback();
    checkAuthStatus().then(isAuth => {
      if (!isAuth) {
        window.localStorage.clear();
        return this.redirectToLogin();
      }
      window.localStorage.setItem("isAuth", "1");
    });
    window.addEventListener(
      "logout",
      () => {
        const auth = getAuth(app);
        signOut(auth);
        window.localStorage.clear();
        this.redirectToLogin();
      },
      { signal: this.controller.signal }
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.controller.abort();
  }

  private handleLogoutClick: EventListener = () =>
    this.dispatchEvent(new Event("logout", { composed: true, bubbles: true }));

  private redirectToLogin() {
    const redirectUrl = new URL(window.location.href);
    redirectUrl.pathname = "/admin/login";
    return (window.location.href = redirectUrl.toString());
  }

  static styles = [
    globalStyles,
    css`
      :host {
        --theme-color: #141313;
      }
      nav {
        background-color: var(--theme-color);
        border: 1px solid var(--theme-color);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      nav ul {
        display: flex;
        background-color: #141313;
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
    return html`<nav>
      <ul>
        <li><a href="/admin/blog">新規投稿</a></li>
        <li><a href="/admin/inquiry">お問合せ一覧</a></li>
        <li><a @click=${this.handleLogoutClick}>ログアウト</a></li>
      </ul>
    </nav>`;
  }
}
