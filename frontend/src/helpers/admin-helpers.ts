export const sendLoginReq = (data: LoginCredentials) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  }).then(result => {
    if (!result.ok)
      throw Error(`Login failed: ${result.status} ${result.statusText}`);
    return result.json();
  });

export const fetchInquiries = (page: number, limit: number) =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_URI}/inquiries?limit=${limit}&page=${page}`,
    {
      credentials: "include",
    }
  ).then(result => {
    if (!result.ok)
      throw Error(
        `Inquiry Fetch Failed: ${result.status} ${result.statusText}`
      );
    return result.json();
  });

export const sendPost = (data: {
  title: string;
  body: string;
  picture?: string;
}) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URI}/posts/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then(result => {
    if (!result.ok)
      throw Error(
        `Inquiry Fetch Failed: ${result.status} ${result.statusText}`
      );
    return result.json();
  });

export const updatePost = (
  id: number,
  data: {
    title: string;
    body: string;
    picture?: string;
  }
) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URI}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then(result => {
    if (!result.ok)
      throw Error(
        `Inquiry Fetch Failed: ${result.status} ${result.statusText}`
      );
    return result.json();
  });

export const convertToB64 = (filesList: FileList) =>
  new Promise((resolve, reject) => {
    const file = filesList[0];
    if (!(file instanceof Blob)) throw TypeError("File Provided not Blob");

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
