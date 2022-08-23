export const sendInquiry = (data: InquiryData) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URI}/inquiries/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(result => {
    if (!result.ok) throw Error(`Request Failed: ${result.status}`);
    return result.json();
  });
