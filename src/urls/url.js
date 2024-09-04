const authenticationBaseUrl = process.env.REACT_APP_API_URL;

const backendUrls = {
    Command: {
        createCommand: authenticationBaseUrl + "/createCommande"
    },
    productList: {
        productList: authenticationBaseUrl + "/produitsList"
    }, 
    getFidelityCard: authenticationBaseUrl + "/client/",
    categoriesList: authenticationBaseUrl +'/listCategories',
    productsByCategory: authenticationBaseUrl +'/produitByCategories/'
}
export default backendUrls;