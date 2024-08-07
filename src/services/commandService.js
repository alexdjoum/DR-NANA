import { POST } from '../api/getMethod';
import backendUrls from '../urls/url';


const CommandService = {
    createCommand: async function (data) {
        const url = backendUrls.Command.createCommand;
        console.log(`data de create Command ==>>`, url)
        const result = await POST(url, data)
        .then((r) => r.json())
        return result;
    },

}

export default CommandService;