/**
 * Loads a custom element if it is not already registered.
 *
 * @returns {void}
 */
export const loadComponent = <T extends CustomElementConstructor>(
  tagName: string,
  elementDefinition: T
) => {
  if (window.customElements.get(tagName)) return;
  customElements.define(tagName, elementDefinition);
};
