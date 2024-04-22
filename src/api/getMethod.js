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
  