import BaseModel from "./BaseModel";

export default class Company extends BaseModel {
    name: string;
    type: string;
    active: boolean;
}
