import {CardModel} from "./CardModel";

export interface ColumnModel {
    id: string;
    name: string;
    cards: CardModel[]
}
