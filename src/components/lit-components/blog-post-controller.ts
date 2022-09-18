import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { loadComponent } from "./helpers";
import { tagName as blogPostsTagName, BlogPosts } from "./blog-posts";
import {
  tagName as singleBlogPostTagName,
  SingleBlogPost,
} from "./single-blog-post";

const tagName = "blog-post-controller";

@customElement(tagName)
export class BlogPostController extends LitElement {
  @state()
  private postId = "";

  constructor() {
    super();
    loadComponent(blogPostsTagName, BlogPosts);
    loadComponent(singleBlogPostTagName, SingleBlogPost);
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("popstate", this.handlePopState);
  }

  private handlePopState = (event: PopStateEvent) => {
    const state = event.state;
    if (!(state && "postId" in state)) return (this.postId = "");
    this.postId = state.postId;
  };

  private handleOpenPost(event: CustomEvent<string>) {
    this.postId = event.detail;
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("post-id", this.postId);
    history.pushState({ postId: this.postId }, "", newUrl);
  }

  render() {
    return html`<blog-posts
        @open-post=${this.handleOpenPost}
        ?hide=${Boolean(this.postId)}
      ></blog-posts>
      <single-blog-post
        ?hide=${!Boolean(this.postId)}
        post-id=${this.postId}
      ></single-blog-post>`;
  }
}
