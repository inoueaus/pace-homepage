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
