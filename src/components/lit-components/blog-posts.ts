import {
  endBefore,
  get,
  limitToLast,
  orderByChild,
  query as dbQuery,
  ref,
} from "firebase/database";
import { html, css, PropertyValueMap } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { tagName as loadingIconTagName, LoadingIcon } from "./loading-icon";
import {
  tagName as firebasePictureTagName,
  FirebasePicture,
} from "./firebase-picture";
import FirebaseElement from "./firebase-element";
import { globalStyles } from "./styles";
import { postCss } from "./styles/post";
import type { PostModel, PostServerModel } from "@localTypes/post-model";
import { loadComponent } from "./helpers";
import { resolveMarkdown } from "lit-markdown";

export const tagName = "blog-posts";

@customElement(tagName)
export class BlogPosts extends FirebaseElement {
  @state()
  private posts: PostModel[] = [];
  @state()
  private loading = true;
  private observer: IntersectionObserver;
  @query("div#end")
  private endDiv!: HTMLDivElement;
  private lastPostDate = 0;
  private allLoaded = false;

  constructor() {
    super();
    loadComponent(loadingIconTagName, LoadingIcon);
    loadComponent(firebasePictureTagName, FirebasePicture);
    this.observer = new IntersectionObserver(this.observerCallback, {
      root: null,
      threshold: 1.0,
      rootMargin: "0px",
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.getPosts()
      .then(posts => {
        this.posts = posts.reverse();
      })
      .finally(() => (this.loading = false));
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this.observer.observe(this.endDiv);
  }

  private getPosts() {
    return get(
      dbQuery(
        ref(this.db, "/posts"),
        orderByChild("createdAt"),
        endBefore(this.lastPostDate ? this.lastPostDate : ""),
        limitToLast(5)
      )
    ).then(snapshot => {
      const data: Record<string, PostServerModel> | null = snapshot.val();
      if (!data) {
        this.allLoaded = true;
        return Promise.resolve([]);
      }
      const posts: PostModel[] = Object.entries(data).map(([key, value]) => ({
        ...value,
        id: key,
      }));
      this.lastPostDate = posts[0].createdAt;
      return Promise.resolve(posts);
    });
  }

  private observerCallback: ConstructorParameters<
    typeof IntersectionObserver
  >[0] = ([entry]) => {
    if (!(entry && entry.isIntersecting && this.posts.length)) return;
    if (this.allLoaded) return;
    this.getPosts().then(posts => {
      this.posts = [...this.posts, ...posts.reverse()];
    });
  };

  private handlePostClick: EventListener = event => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) throw TypeError();
    const id = target.id;
    const openPostEvent = new CustomEvent("open-post", {
      detail: id,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(openPostEvent);
  };

  static styles = [
    globalStyles,
    postCss,
    css`
      :host {
        margin: 1rem 0;
        min-height: 90vh;
        display: block;
        position: relative;
      }

      :host([hide]) {
        display: none;
      }
    `,
  ];

  render() {
    return html`${this.loading ? html`<loading-icon></loading-icon>` : ""}
      ${this.posts.map(
        post => html`
          <article id=${post.id} @click=${this.handlePostClick}>
            <h3 class="styles.title">${post.title}</h3>
            <div class="styles.body">
              <div class="text-picture-container">
                ${post.picture
                  ? html`<firebase-picture
                      image-name=${post.picture}
                    ></firebase-picture>`
                  : ""}
                <section class="body-text">
                  <div class="text-container">
                    ${this.isConnected
                      ? resolveMarkdown(post.body, {
                          includeImages: false,
                          loadingHTML: "<loading-icon></loading-icon>",
                        })
                      : ""}
                  </div>
                  <div class="fade"></div>
                </section>
              </div>
              <small>${new Date(post.createdAt).toLocaleString()}</small>
            </div>
          </article>
        `
      )}
      <div id="end"></div>`;
  }
}
