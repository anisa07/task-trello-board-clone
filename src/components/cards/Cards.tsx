import {Card} from "../card/Card";
import {Draggable, Droppable} from "react-beautiful-dnd";
import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {ColumnModel} from "../../types/ColumnModel";
import {CardModel} from "../../types/CardModel";
import {createCard} from "../../helpers/boardHelper";
import { theme } from '@anisa07/design-package-app-test';

interface CardsProps {
    column: ColumnModel,
    onUpdateColumn: (copyColumn: ColumnModel) => void;
}

// TODO fix theme; make it less hardcoded
const t = theme.theme;
const useStyles = makeStyles({
    emptyColumn: {
        border: `1px dashed ${t.palette.secondary.main}`,
        padding: '1.5rem',
        margin: '1rem 0',
        '&::after': {
            content: '"Drop Card Here"',
            display: 'block',
            textAlign: 'center',
            color: t.palette.secondary.main
        }
    }
});

export const Cards = (props: CardsProps) => {
    const {column, onUpdateColumn} = props;
    const classes = useStyles();

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

    const columnIsEmpty = () => column.cards.length === 0;

    return (<>
        <Droppable droppableId={column.id} type="CARDS">{
            (provided) => (
                <div ref={provided.innerRef} className={`${columnIsEmpty() ? classes.emptyColumn : ''}`}>
                    {
                        column.cards.map((card, index) =>
                            <Draggable key={card.id} draggableId={card.id} index={index}>
                                {(provided, snapshot) => {
                                    const style = {
                                        margin: '10px 0',
                                        backgroundColor: snapshot.isDragging ? t.palette.info.main : '',
                                        ...provided.draggableProps.style,
                                    };
                                    return (
                                        <div
                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                            style={style}>
                                            <Card
                                                index={index}
                                                card={card}
                                                onUpdateCard={handleUpdateCard}
                                                onDeleteCard={handleDeleteCard}
                                            />
                                        </div>
                                    )
                                }
                                }
                            </Draggable>)
                    }
                    {provided.placeholder}
                </div>
            )
        }</Droppable>
        {canAddNewCard() &&
        <Button
            data-testid="add-new-card"
            onClick={handleAddNewCard}>
            Add New Card
        </Button>}
    </>)
}
