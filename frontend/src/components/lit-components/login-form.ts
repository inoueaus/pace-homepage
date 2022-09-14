import { html, LitElement } from "lit";
import { state, customElement, property } from "lit/decorators.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { globalStyles } from "./styles";
import { tagName as loadingIconTagName, LoadingIcon } from "./loading-icon";
import formStyles from "./styles/form";
import { app } from "@firebase/index";

const tagName = "login-form";

@customElement(tagName)
export class LoginForm extends LitElement {
  @state()
  private loginError = "";
  @state()
  private loading = false;
  private auth: ReturnType<typeof getAuth>;

  constructor() {
    super();
    this.auth = getAuth(app);
    if (!window.customElements.get(loadingIconTagName)) {
      window.customElements.define(loadingIconTagName, LoadingIcon);
    }
  }

  private handleSubmit: EventListener = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement))
      throw TypeError("Listener must be used with form.");
    this.loginError = "";
    this.loading = true;
    const formData = new FormData(form);
    const email = formData.get("email")!.toString().trim();
    const password = formData.get("password")!.toString().trim();

    if (!(email && password)) return;
    this.loading = true;
    this.loginError = "";
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        window.localStorage.setItem("isAuth", "1");
        const redirectUrl = new URL(window.location.href);
        redirectUrl.pathname = "/admin";
        window.location.href = redirectUrl.toString();
      })
      .catch(error => {
        if (!(error instanceof Error)) return;
        this.loginError = error.message;
      })
      .finally(() => (this.loading = false));
  };

  static styles = [globalStyles, formStyles];

  render() {
    return html`${this.loginError
        ? html`<div style="color: red; text-align: center;">
            ${this.loginError}
          </div>`
        : ""}
      <form @submit=${this.handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            name="email"
            autocomplete="email"
            type="email"
            maxlength="255"
            minlength="2"
            required
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
          />
        </div>
        <button className="{styles.submit}" type="submit">
          ${this.loading ? html`<loading-icon small></loading-icon>` : "送信"}
        </button>
      </form>`;
  }
}
