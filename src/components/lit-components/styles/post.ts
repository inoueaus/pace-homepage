import { css } from "lit";

export const postCss = css`
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
    max-height: 150px;
    margin: auto 0;
    display: flex;
    position: relative;
  }

  .text-container {
    max-height: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
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

  .fade {
    bottom: 0;
    height: 50%;
    background: linear-gradient(
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    position: absolute;
    width: 100%;
  }

  img {
    max-width: 100%;
    border-radius: 4px;
  }

  h3 {
    color: #372c3e;
    margin: 0 1rem 2rem 1rem;
  }

  article {
    padding: 1rem;
    border: 1px solid white;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.103);
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;
