export const apiCall = async (method, url, payload) => {
  console.log(method, url, payload);
  let data, response;
  try {
    switch (method) {
      case "GET":
        console.log(url, payload);
        response = await fetch(
          url,
          { method: "GET", credentials: "include" },
          5000
        );
        break;
      case "POST":
        console.log(url, payload, method);

        response = await fetch(
          url,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
          5000
        );

        break;
      case "DELETE":
        response = await fetch(url, {
          method: "delete",
          credentials: "include",
        });
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case "FORMDATA":
        const formData = new FormData();
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            formData.append(key, payload[key]);
          }
        }

        response = await fetch(url, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case "MULTY":
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      default:
        console.log(`Sorry, we are out of.`);
    }
    data = await response.json();
    console.log(data);
    return data;
  } catch (error) {}
};
