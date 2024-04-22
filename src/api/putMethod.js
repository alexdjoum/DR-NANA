export async function postJSON(data, url) {
    try {
      const response = await fetch(url, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("La réponse n'est pas OK");
      }
  
      const result = await response.json();
      console.log("Réussite :", result);
    } catch (erreur) {
      console.error("Erreur :", erreur);
    }
}