import Method from '../interface/Method';
import { OptionAPI } from '../interface/OptionAPI';
import { GetData, ResponseObject } from '../types';

class Loader {
    constructor(
        private baseLink: string,
        private options: OptionAPI
    ) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: ResponseObject,
        callback: GetData<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(Method.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: OptionAPI, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: Method, endpoint: string, callback: GetData<T>, options: OptionAPI = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
