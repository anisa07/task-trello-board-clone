import {CardModel} from "../../types/CardModel";
import {ComponentHeader} from '@anisa07/design-package-app-test';
import {ChangeEvent, useState} from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useCommonStyles } from "@anisa07/design-package-app-test";

const useStyles = makeStyles({
    cardContainer: {
        padding: '1rem',
    },
    editContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0.5rem 0'
    },
    cardButton: {
        marginTop: '0.5rem',
        alignSelf: 'flex-start'
    },
});

interface CardProps {
    index: number;
    card: CardModel;
    onUpdateCard: (updateCard: CardModel) => void;
    onDeleteCard: (id: string) => void;
}

export const Card = (props: CardProps) => {
    const {card, onUpdateCard, onDeleteCard} = props;
    const [editCard, setEditCard] = useState(false);
    const classes = useStyles();
    const commonStyles = useCommonStyles();

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

    const handleUpdateCardDescription = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onUpdateCard({...props.card, description: e.target?.value || ''})
    }

    return (
        <div className={`${classes.cardContainer} ${commonStyles.border}`}>
            <ComponentHeader
                name={card.name}
                label="Card Name"
                buttonLabel="Delete Card"
                onDeleteComponent={handleDeleteCard}
                onUpdateComponentName={handleUpdateCardName}
            />
            <div className={classes.editContainer}>
                {editCard && <>
                    <TextField
                        inputProps={{
                            'data-testid': 'description'
                        }}
                        label="Description"
                        multiline
                        rows={4}
                        value={card.description}
                        onChange={handleUpdateCardDescription}
                        variant="outlined"
                    />
                </>}
                <Button className={classes.cardButton} onClick={toggleEditCard}>{editButtonTitle()}</Button>
            </div>
        </div>
    )
}
