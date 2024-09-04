import { GET, POST } from '../api/getMethod';
import backendUrls from '../urls/url';


const categoryService = {
    categoryList: async function () {
        //console.log('voir params ==>> ',params)
        const url = backendUrls.categoriesList
        //console.log(`data de create Command ==>>`, url)
        const result = await GET(url)
        .then((r) => r.json())
        return result;
    }
}

export default categoryService;