import { directive } from "lit/directive.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { AsyncDirective } from "lit/async-directive.js";
import { marked } from "marked";

class MarkdownDirective extends AsyncDirective {
  render(raw = "", settings = { removeImages: false }) {
    const markdownToRender = settings.removeImages
      ? raw.replaceAll(/!\[.*\](.*)/g, "")
      : raw;
    new Promise<string>((resolve, reject) => {
      marked.parse(markdownToRender, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    }).then(mdHtml => {
      const renderedUnsafe = unsafeHTML(mdHtml);
      this.setValue(renderedUnsafe);
    });
    return "...";
  }
}

export const resolveMarkdown = directive(MarkdownDirective);
