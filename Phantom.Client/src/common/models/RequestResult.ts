export default class RequestResult<T> {
    successfully: boolean;
    data?: T;

    constructor(options: {
        successfully: boolean,
        data?: T }) {
            this.successfully = options.successfully;
            this.data = options.data;
        }
}
