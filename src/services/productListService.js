import { GET, POST } from '../api/getMethod';
import backendUrls from '../urls/url';


const productListService = {
    productList: async function () {
        const url = backendUrls.productList.productList
        console.log(`data de create Command ==>>`, url)
        const result = await GET(url)
        .then((r) => r.json())
        return result;
    },
    productListWithFilterByPage: async function (minPrice,maxPrice) {
        const url = `${backendUrls.productList.productList}?prix1=${minPrice}&prix2=${maxPrice}`;
        const result = await GET(url)
        .then((r) => r.json())
        return result
    },
    getFidelityCard: async function (data) {
        console.log('Voir la data de la carte de fidelité ==> ', data)
        const url = `${backendUrls.getFidelityCard}${data.matricule}`;
        const result = await GET(url)
        .then((r) => r.json())
        return result
    }

}

export default productListService;