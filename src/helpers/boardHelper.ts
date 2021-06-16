import { v4 as uuidv4 } from 'uuid';

export const setEmptyBoard = () => ({
    id: "",
    name: "",
    columns: []
})

export const createColumn = () => ({
    id: uuidv4(),
    name: "",
    cards: []
})
