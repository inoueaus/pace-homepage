import { css } from "lit";

export const markdownStyles = css`
  img {
    max-width: 100%;
    height: auto;
    width: auto;
  }

  table {
    width: 100%;
    margin: 1rem 0;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid var(--secondary-color);
  }

  thead tr:last-child,
  tbody tr:last-child {
    border-bottom: 1px solid var(--secondary-color);
  }

  td {
    padding: 0.5rem;
    text-align: center;
    border-right: 1px solid var(--secondary-color);
  }
  tbody tr {
    border-bottom: 1px solid #dddddd;
  }
`;
