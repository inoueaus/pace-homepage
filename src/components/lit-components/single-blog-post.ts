import { get, ref as databaseRef } from "firebase/database";
import { html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { PostServerModel } from "../../../types/post-model";
import FirebaseElement from "./firebase-element";
import { loadComponent } from "./helpers";
import { globalStyles } from "./styles";
import { tagName as loadingIconTagName, LoadingIcon } from "./loading-icon";
import {
  tagName as firebasePictureTagName,
  FirebasePicture,
} from "./firebase-picture";
import { resolveMarkdown } from "lit-markdown";

export const tagName = "single-blog-post";

@customElement(tagName)
export class SingleBlogPost extends FirebaseElement {
  @property({ attribute: "post-id" })
  private postId = 0;
  @state()
  private post: PostServerModel | null = null;
  @state()
  private loading = true;

  constructor() {
    super();
    loadComponent(loadingIconTagName, LoadingIcon);
    loadComponent(firebasePictureTagName, FirebasePicture);
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, _old, value);
    if (name === "post-id") {
      get(databaseRef(this.db, `/posts/${this.postId}`))
        .then(snapshot => {
          this.post = snapshot.val();
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  static styles = [
    css`
      * {
        box-sizing: border-box;
      }

      :host([hide]) {
        display: none;
      }

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

      .card #edit {
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

      a {
        color: #372c2e;
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
    if (!this.post) return;

    const isAuth = Boolean(Number(window.localStorage.getItem("isAuth")));
    const editUrl = new URL(window.location.href);
    editUrl.pathname = "/admin/blog/edit";
    editUrl.searchParams.set("post-id", String(this.postId));

    return html`
      <article class="card">
        ${this.loading ? html`<loading-icon></loading-icon>` : ""}
        ${isAuth ? html` <a id="edit" href=${editUrl.toString()}>編集</a>` : ""}
        <h3>${this.post?.title ?? ""}</h3>
        <div class="body">
          ${this.post.picture
            ? html`<firebase-picture
                image-name=${this.post.picture}
              ></firebase-picture>`
            : ""}
          <div class="body-text long-body">
            ${this.isConnected
              ? resolveMarkdown(this.post.body, {
                  includeImages: true,
                  loadingHTML: "<loading-icon",
                })
              : ""}
          </div>
          <small>${new Date(this.post.createdAt).toLocaleDateString()}</small>
        </div>
      </article>
    `;
  }
}
