import { css, html, LitElement } from "lit";
import { state, customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles";

const tagName = "login-form";

@customElement(tagName)
export class LoginForm extends LitElement {
  @property({ attribute: "api-path" })
  private apiPath = "";
  @state()
  private loginError = "";
  @state()
  private loading = false;

  private handleSubmit: EventListener = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement))
      throw TypeError("Listener must be used with form.");
    this.loginError = "";
    this.loading = true;
    const formData = new FormData(form);
    const username = formData.get("username")!.toString().trim();
    const password = formData.get("password")!.toString().trim();

    if (!(username && password)) return;
    fetch(`${this.apiPath}/users/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then(result => {
        console.log(result);
        if (!result.ok)
          throw Error(`Login failed: ${result.status} ${result.statusText}`);
        const redirectUrl = new URL(window.location.href);
        redirectUrl.pathname = "/admin";
        window.location.href = redirectUrl.toString();
      })
      .catch(error => {
        if (error instanceof Error) {
          this.loginError = error.message;
        }
      })
      .finally(() => (this.loading = false));
  };

  static styles = [
    globalStyles,
    css`
      div {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: 1rem auto;
      }

      div label {
        color: #372c2e;
        margin-bottom: 0.5rem;
      }

      div input {
        border: 1px solid rgb(214, 214, 214);
        border-radius: 4px;
        height: 40px;
        padding: 1rem;
      }

      div textarea {
        border: 1px solid rgb(214, 214, 214);
        border-radius: 4px;
        height: 200px;
        padding: 1rem;
      }

      button {
        color: white;
        display: block;
        background-color: #372c2e;
        border: 1px solid #372c2e;
        border-radius: 8px;
        width: 50%;
        text-align: center;
        padding: 1rem 0;
        cursor: pointer;
        user-select: none;
        margin: 1rem auto 0 auto;
      }
    `,
  ];

  render() {
    return html` ${this.loginError
        ? html`<div style="color: red; text-align: center;">
            ${this.loginError}
          </div>`
        : ""}
      <form @submit=${this.handleSubmit}>
        <div>
          <label htmlFor="username">ユーザー名</label>
          <input
            id="username"
            name="username"
            autocomplete="username"
            type="text"
            maxlength="255"
            minlength="2"
            required
            placeholder="username"
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            autocomplete="current-password"
            type="password"
            maxlength="255"
            minlength="2"
            required
            placeholder="password"
          />
        </div>
        <button className="{styles.submit}" type="submit">
          ${this.loading ? html`<loading-spinner></loading-spinner>` : "送信"}
        </button>
      </form>`;
  }
}
