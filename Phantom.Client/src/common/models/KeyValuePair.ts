export default class KeyValuePair<K, V> {
    key: K;
    value: V;

    constructor(options: {
        key: K,
        value: V }) {
            this.key = options.key;
            this.value = options.value;
        }
}
