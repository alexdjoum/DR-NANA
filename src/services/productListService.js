import { GET, POST } from '../api/getMethod';
import backendUrls from '../urls/url';


const productListService = {
    productList: async function (params) {
        //console.log('voir params ==>> ',params)
        const url = backendUrls.productList.productList+'?'+params;
        //console.log(`data de create Command ==>>`, url)
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
        const url = `${backendUrls.getFidelityCard}${data.matricule}/${data.mobile}`;
        const result = await GET(url)
        .then((r) => r.json())
        return result
    },
    getProductByCategory: async function (id) {
        const url = backendUrls.productsByCategory+id;
        const result = await GET(url)
        .then((r) => r.json())
        return result;
    },
    getProductDetail: async function (codePro) {
        const url = backendUrls.productDetails+codePro;
        const result = await GET(url)
        .then((r) => r.json())
        return result
    }

}

export default productListService;