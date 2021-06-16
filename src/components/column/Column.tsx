import {ColumnModel} from "../../types/ColumnModel";
import {ComponentHeader} from "../componentHeader/componentHeader";
import './Column.css';
import {Cards} from "../cards/Cards";
import {MoveDirection} from "../../types/MoveDirection";

interface ColumnProps {
    column: ColumnModel,
    onUpdateColumn: (copyColumn: ColumnModel) => void;
    onDeleteColumn: (id: string) => void;
    onMoveCard: (direction: MoveDirection, columnId: string, cardId: string) => void;
}

export const Column = (props: ColumnProps) => {
    const {column, onUpdateColumn, onDeleteColumn, onMoveCard} = props;

    const handleDeleteColumn = () => {
        onDeleteColumn(column.id);
    }

    const handleUpdateColumnName = (name: string) => {
        const copyColumn = {...column, name};
        onUpdateColumn(copyColumn);
    }

    const handleMoveCard = (direction: MoveDirection, cardId: string) => {
        onMoveCard(direction, column.id, cardId);
    }

    return (
        <div className="column">
            <ComponentHeader
                name={column.name}
                label="Column Name"
                buttonLabel="Delete Column"
                onDeleteComponent={handleDeleteColumn}
                onUpdateComponentName={handleUpdateColumnName}
            />
            <Cards
                column={column}
                onUpdateColumn={onUpdateColumn}
                onMoveCard={handleMoveCard}
            />
        </div>
    )
}
