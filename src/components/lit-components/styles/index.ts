import { css } from "lit";

export const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    --secondary-color: rgb(214, 214, 214);
  }
`;

export const cardStyles = css`
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

  .card h1 {
    text-align: center;
    font-size: 3rem;
    color: #372c2e;
    padding: 0;
    margin: 1rem;
  }

  .card h2 {
    text-align: center;
    font-size: 1.5rem;
    color: #de9e48;
    padding: 0;
    margin: 1rem 0 2rem 0;
  }
  .card h3 {
    text-align: center;
    width: 60%;
    font-size: 1.2rem;
    color: #de9e48;
    padding: 0;
    margin: 1rem auto 2rem auto;
  }

  .card h4 {
    text-align: center;
    font-size: 1rem;
    color: #372c2e;
    padding: 0;
    margin: 1rem;
  }

  .card span {
    text-align: left;
    color: #372c2e;
    padding: 0 5rem 3rem 5rem;
  }

  .card a {
    color: white;
    background-color: #372c2e;
    border: 1px solid #372c2e;
    border-radius: 8px;
    width: 80%;
    margin: 2rem auto 2rem auto;
    text-align: center;
    padding: 2rem 0;
    cursor: pointer;
    user-select: none;
  }

  .full {
    min-height: 90vh;
  }

  .half {
    min-height: 40vh;
  }

  .wide {
    width: auto;
    max-width: 100%;
  }

  .flex {
    flex: 0 0 49%;
    margin: 2rem 0;
  }

  @media screen and (max-width: 500px) {
    .wide {
      max-width: 90%;
    }

    .card span {
      padding: 0 2rem 1rem 2rem;
    }
  }
`;
