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
