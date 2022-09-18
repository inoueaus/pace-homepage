interface CustomEventMap {
  "open-post": CustomEvent<string>;
}

declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, event: CustomEventMap[K]) => void
    ): void;
  }

  interface HTMLElement {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, event: CustomEventMap[K]) => void
    ): void;
  }

  namespace JSX {
    interface IntrinsicElements {
      "loading-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;

      "single-blog-post": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};
