import {CardModel} from "../../types/CardModel";
import {ComponentHeader} from "../componentHeader/componentHeader";
import {useState} from "react";
import {TextArea} from "../textArea/TextArea";
import './Card.css';
import { MoveControl } from "../moveControl/MoveControl";
import {MoveDirection} from "../../types/MoveDirection";

interface CardProps {
    card: CardModel;
    onUpdateCard: (updateCard: CardModel) => void;
    onDeleteCard: (id: string) => void;
    onMoveCard: (direction: MoveDirection, cardId: string) => void;
}

export const Card = (props: CardProps) => {
    const {card, onUpdateCard, onDeleteCard, onMoveCard} = props;
    const [editCard, setEditCard] = useState(false);

    const toggleEditCard = () => {
        setEditCard(!editCard)
    }

    const editButtonTitle = () => editCard ? 'Close Edit' : 'Open Edit'

    const handleDeleteCard = () => {
        onDeleteCard(card.id);
    }

    const handleUpdateCardName = (newName: string) => {
        onUpdateCard({...card, name: newName});
    }

    const handleUpdateCardDescription = (description: string) => {
        onUpdateCard({...props.card, description})
    }

    const handleMoveCard = (direction: MoveDirection) => {
        onMoveCard(direction, card.id)
    }

    return (
        <div className="card">
            <ComponentHeader
                name={card.name}
                label="Card Name"
                buttonLabel="Delete Card"
                onDeleteComponent={handleDeleteCard}
                onUpdateComponentName={handleUpdateCardName}
            />
            {editCard && <>
                <TextArea
                    value={card.description}
                    label="Description"
                    onChangeValue={handleUpdateCardDescription} />
                <MoveControl onMoveCard={handleMoveCard}/>
            </>}
            <div>
                <button className="cardButton" onClick={toggleEditCard}>{editButtonTitle()}</button>
            </div>
        </div>
    )
}
