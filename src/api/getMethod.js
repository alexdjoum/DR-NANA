export default async function getJSON(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("La réponse n'est pas OK");
      }
  
      //const result = await response.json();
      //return result
      return response
      //console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const POST = function (url, data) {
      console.log("login ===>",data);
      return fetch(url, {
          "method": "POST",
          "headers": {
              "content-type": "application/json",
              "accept": "application/json"
          },
          "body": JSON.stringify(data)
      })
  };

  const GET = function (url) {
    return fetch(url, {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        }
    })
  };

export {
  POST,
  GET
};