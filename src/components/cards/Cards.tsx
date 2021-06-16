import {ColumnModel} from "../../types/ColumnModel";
import {CardModel} from "../../types/CardModel";
import {createCard} from "../../helpers/boardHelper";
import { Card } from "../card/Card";
import {MoveDirection} from "../../types/MoveDirection";

interface CardsProps {
    column: ColumnModel,
    onUpdateColumn: (copyColumn: ColumnModel) => void;
    onMoveCard: (direction: MoveDirection, cardId: string) => void;
}

export const Cards = (props: CardsProps) => {
    const {column, onUpdateColumn, onMoveCard } = props;

    const handleUpdateCard = (card: CardModel) => {
        const copyColumn = {...column};
        const cardIndex = copyColumn.cards.findIndex(c => c.id === card.id);
        copyColumn.cards[cardIndex] = card;
        onUpdateColumn(copyColumn);
    }

    const handleAddNewCard = () => {
        const copyColumn = {...column};
        copyColumn.cards.push(createCard());
        onUpdateColumn(copyColumn);
    }

    const handleDeleteCard = (cardId: string) => {
        const copyColumn = {...column};
        const cardIndex = copyColumn.cards.findIndex(c => c.id === cardId);
        copyColumn.cards.splice(cardIndex, 1);
        onUpdateColumn(copyColumn);
    }

    const canAddNewCard = () =>
        column.name
        && (column.cards.length === 0
        || column.cards[column.cards.length - 1].name);

    return (<div>
        {column.cards.map(card =>
            <Card
                key={card.id}
                card={card}
                onUpdateCard={handleUpdateCard}
                onDeleteCard={handleDeleteCard}
                onMoveCard={onMoveCard}
            />)}
        {canAddNewCard() &&
        <button
            onClick={handleAddNewCard}>
            Add New Card
        </button>}
    </div>)
}
