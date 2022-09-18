import { css } from "lit";

const formStyles = css`
  div {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 1rem auto;
  }

  div label {
    color: #372c2e;
    margin-bottom: 0.5rem;
  }

  div input {
    border: 1px solid rgb(214, 214, 214);
    border-radius: 4px;
    height: 40px;
    padding: 1rem;
  }

  div textarea {
    border: 1px solid rgb(214, 214, 214);
    border-radius: 4px;
    height: 200px;
    padding: 1rem;
  }

  button {
    color: white;
    display: block;
    background-color: #372c2e;
    border: 1px solid #372c2e;
    border-radius: 8px;
    width: 50%;
    text-align: center;
    padding: 1rem 0;
    cursor: pointer;
    user-select: none;
    margin: 1rem auto 0 auto;
  }

  input[type="file"] {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
  }

  .file-label {
    background-color: white;
    border: 1px solid rgb(214, 214, 214);
    border-radius: 8px;
    width: 80%;
    text-align: center;
    padding: 0.5rem 1rem;
    margin: 0 auto;
    cursor: pointer;
  }
`;

export default formStyles;
