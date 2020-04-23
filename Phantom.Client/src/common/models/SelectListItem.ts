export default class SelectListItem {
    label: string;
    value: any;
    selected?: boolean;
    disabled?: boolean;
    placeholder?: boolean;
    text?: string;

    constructor(options: {
        label: string,
        value: any,
        selected?: boolean,
        disabled?: boolean,
        placeholder?: boolean }) {
            this.label = options.label;
            this.value = options.value;
            this.selected = options.selected;
            this.disabled = options.disabled;
            this.placeholder = options.placeholder;
        }
}
