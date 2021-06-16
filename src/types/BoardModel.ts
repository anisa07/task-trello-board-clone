import {ColumnModel} from "./ColumnModel";

export interface BoardModel {
    id: string;
    name: string;
    columns: ColumnModel[];
}
