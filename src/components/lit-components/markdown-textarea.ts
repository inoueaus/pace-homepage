import { css, html, LitElement, render } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { globalStyles } from "./styles";
import formStyles from "./styles/form";

export const tagName = "markdown-textarea";

@customElement(tagName)
export class MarkdownTextarea extends LitElement {
  #markdownMap: Map<string, string>;
  @property({ attribute: "name" })
  public name = "";
  @property({ attribute: "required", type: Boolean })
  public required = false;
  @query("textarea")
  private textarea!: HTMLTextAreaElement;

  get value() {
    return this.textarea.value;
  }
  set value(value: string) {
    if (typeof value !== "string") throw TypeError("Value must be string.");
    if (!this.textarea) return;
    this.textarea.value = value;
  }

  constructor() {
    super();
    this.#markdownMap = new Map([
      ["h1", "#"],
      ["h2", "##"],
      ["h3", "###"],
      ["h4", "####"],
      ["h5", "#####"],
      ["i", "_"],
      ["b", "**"],
    ]);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.textarea.value = this.textContent ?? "";
    this.textarea.addEventListener("input", () => {
      this.triggerInputEvent();
      this.renderToLightDom();
    });
    this.renderToLightDom();
  }

  private handleHeaderClick: EventListener = event => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) throw TypeError();
    const id = target.id;
    const markdownSymbol = this.#markdownMap.get(id) ?? "";
    const { selectionStart, value } = this.textarea;
    const isFullParagraph = selectionStart
      ? value.at(selectionStart - 1) === "\n"
      : true;
    const newValue = `${value.substring(0, selectionStart)}${
      isFullParagraph ? "" : "\n"
    }${markdownSymbol} ${value.substring(selectionStart)}`;
    this.textarea.value = newValue;
    this.textarea.focus();
    this.triggerInputEvent();
  };

  private handleModifierClick: EventListener = event => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) throw TypeError();
    const id = target.id;
    const markdownSymbol = this.#markdownMap.get(id) ?? "";
    const { selectionStart, selectionEnd, value } = this.textarea;
    const newValue = `${value.substring(
      0,
      selectionStart
    )} ${markdownSymbol}${value.substring(
      selectionStart,
      selectionEnd
    )}${markdownSymbol} ${value.substring(selectionEnd)}`;
    this.textarea.value = newValue;
    this.textarea.focus();
    this.triggerInputEvent();
  };

  private triggerInputEvent() {
    this.dispatchEvent(new Event("input", { composed: true }));
  }

  static styles = [
    globalStyles,
    formStyles,
    css`
      :host {
        display: flex;
        width: 100%;
        flex-direction: column;
      }

      ul {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 0;
        padding: 0 4px;
        width: 100%;
        height: 40px;
        list-style-type: none;
        border: 1px solid var(--secondary-color);
        border-radius: var(--radius);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background-color: var(--secondary-color);
      }

      li {
        padding: 0.5rem;
        margin: 0;
        cursor: pointer;
        border-radius: var(--radius);
      }
      li:hover {
        background-color: var(--secondary-color-hover);
      }

      textarea {
        border: 1px solid var(--secondary-color);
        border-bottom-left-radius: var(--radius);
        border-bottom-right-radius: var(--radius);
        min-height: 30vh;
        padding: 0.5rem;
      }
    `,
  ];

  renderToLightDom() {
    render(
      html`<textarea
        slot="input"
        name=${this.name}
        hidden
        .value=${this.textarea.value}
        ?required=${this.required}
      ></textarea>`,
      this
    );
  }

  render() {
    return html`
      <nav>
        <ul>
          <li @click=${this.handleHeaderClick} id="h1">H1</li>
          <li @click=${this.handleHeaderClick} id="h2">H2</li>
          <li @click=${this.handleHeaderClick} id="h3">H3</li>
          <li @click=${this.handleHeaderClick} id="h4">H4</li>
          <li @click=${this.handleHeaderClick} id="h5">H5</li>
          <li @click=${this.handleModifierClick} id="i"><em>i</em></li>
          <li @click=${this.handleModifierClick} id="b"><strong>B</strong></li>
        </ul>
      </nav>
      <textarea
        name=${this.name}
        autocomplete="off"
        maxlength="5000"
      ></textarea>
      <slot name="input"></slot>
    `;
  }
}
