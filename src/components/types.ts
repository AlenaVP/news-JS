import { OptionAPI } from './interface/OptionAPI';

type GetData<T> = (data: T) => void;

type ResponseObject = { endpoint: string; options?: OptionAPI };

export { GetData, ResponseObject };
