const authenticationBaseUrl = process.env.REACT_APP_API_URL;

const backendUrls = {
    Command: {
        createCommand: authenticationBaseUrl + "/createCommande"
    },
    productList: {
        productList: authenticationBaseUrl + "/produitsList"
    }, 
    getFidelityCard: authenticationBaseUrl + "/clients/"
}
export default backendUrls;