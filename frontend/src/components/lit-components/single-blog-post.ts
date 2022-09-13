import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { PostModel } from "../../../types/post-model";
import { globalStyles } from "./styles";

export const tagName = "single-blog-post";

@customElement(tagName)
export class SingleBlogPost extends LitElement {
  @property({ attribute: "api-path" })
  private apiPath = "";
  @property({ attribute: "post-id" })
  private postId = 0;
  @state()
  private post: PostModel = {
    title: "",
    body: "",
    id: 999,
    createdAt: new Date(),
    updatedAt: new Date(),
    picture: null,
  };

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, _old, value);
    if (name === "post-id") {
      fetch(`${this.apiPath}/posts/${this.postId}`)
        .then(result => {
          if (!result.ok)
            throw Error(`Post Fetch Failed: ${result.statusText}`);
          return result.json();
        })
        .then(data => {
          this.post = {
            ...data,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
          };
        });
    }
  }

  static styles = [
    globalStyles,
    css`
      .card {
        width: 90%;
        max-width: 500px;
        border: 1px solid white;
        border-radius: 8px;
        background-color: white;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.103);
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        margin: 2rem auto;
        padding: 1rem;
      }

      .card a {
        color: white;
        background-color: #372c2e;
        border: 1px solid #372c2e;
        border-radius: 8px;
        width: 80%;
        margin: 2rem auto 2rem auto;
        text-align: center;
        padding: 1rem 0;
        cursor: pointer;
        user-select: none;
      }

      .body {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
      }

      small {
        color: grey;
      }

      .text-picture-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .body-text {
        flex: 0 0 65%;
        padding: 1rem;
        padding-bottom: 1rem;
        height: 150px;
        position: relative;
        white-space: pre-wrap;
        height: auto;
        min-height: 200px;
        overflow: auto;
        margin-top: 2rem;
      }

      .text-container {
        height: 100%;
        overflow: hidden;
      }

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

      img {
        max-width: 100%;
        border-radius: 4px;
      }

      h3 {
        color: #372c3e;
        margin: 0 1rem 2rem 1rem;
      }
    `,
  ];

  render() {
    const fileFormat = this.post.picture?.charAt(0) === "/" ? "jpeg" : "png";
    const src = `data:image/${fileFormat};base64,${this.post.picture}`;
    const isAuth = Boolean(Number(window.localStorage.getItem("isAuth")));
    const editUrl = new URL(window.location.href);
    editUrl.pathname = "/admin/blog/edit";
    editUrl.searchParams.set("post-id", String(this.postId));

    return html`
      <article class="card">
        ${isAuth ? html` <a href=${editUrl.toString()}>編集</a>` : ""}
        <h3>${this.post.title}</h3>
        <div class="body">
          ${this.post.picture
            ? html`<div class="picture-container">
                <img src=${src} />
              </div>`
            : ""}
          <p class="body-text long-body">${this.post.body}</p>
          <small>${this.post.createdAt.toLocaleDateString()}</small>
        </div>
      </article>
    `;
  }
}
