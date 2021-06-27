import {ColumnModel} from "../../types/ColumnModel";
import {BoardModel} from "../../types/BoardModel";
import {createColumn} from "../../helpers/boardHelper";
import './Columns.css';
import {Column} from "../column/Column";
import {MoveDirection} from "../../types/MoveDirection";
import {findIndexById} from "../../helpers/arrayHelper";

interface ColumnsProps {
    board: BoardModel,
    onUpdateBoard: (copyBoard: BoardModel) => void
}

export const Columns = (props: ColumnsProps) => {
    const {board, onUpdateBoard} = props;

    const handleUpdateColumn = (column: ColumnModel) => {
        const copyBoard = {...board};
        const columnIndex = findIndexById(copyBoard.columns, column.id);
        copyBoard.columns[columnIndex] = column;
        onUpdateBoard(copyBoard);
    }

    const handleNewColumn = () => {
        const copyBoard = {...board};
        copyBoard.columns.push(createColumn());
        onUpdateBoard(copyBoard)
    }

    const handleDeleteColumn = (columnId: string) => {
        const copyBoard = {...board};
        const columnIndex = findIndexById(copyBoard.columns, columnId);
        copyBoard.columns.splice(columnIndex, 1);
        onUpdateBoard(copyBoard);
    }

    const boardExists = () => !!board.id;

    const canAddNewColumn = () =>
        boardExists()
        && (board.columns.length === 0
        || board.columns[board.columns.length - 1].name);

    const handleMoveCard = (direction: MoveDirection, columnId: string, cardId: string) => {
        const copyBoard = {...board};
        const columnIndex = findIndexById(copyBoard.columns, columnId);
        const cardIndex = findIndexById(copyBoard.columns[columnIndex].cards, cardId);
        const card = copyBoard.columns[columnIndex].cards[cardIndex];
        switch (direction) {
            case MoveDirection.TOP:
                if (cardIndex > 0) {
                    const temp = copyBoard.columns[columnIndex].cards[cardIndex-1];
                    copyBoard.columns[columnIndex].cards[cardIndex-1] = card;
                    copyBoard.columns[columnIndex].cards[cardIndex] = temp;
                } else {
                    return;
                }
                break;
            case MoveDirection.BOTTOM:
                if (cardIndex < copyBoard.columns[columnIndex].cards.length-1) {
                    const temp = copyBoard.columns[columnIndex].cards[cardIndex+1];
                    copyBoard.columns[columnIndex].cards[cardIndex+1] = card;
                    copyBoard.columns[columnIndex].cards[cardIndex] = temp;
                } else {
                    return;
                }
                break;
            case MoveDirection.LEFT:
                if (columnIndex > 0) {
                    copyBoard.columns[columnIndex-1].cards.push(card);
                    copyBoard.columns[columnIndex].cards.splice(cardIndex, 1);
                } else {
                    return;
                }
                break;
            case MoveDirection.RIGHT:
                if (columnIndex < copyBoard.columns.length-1) {
                    copyBoard.columns[columnIndex+1].cards.push(card);
                    copyBoard.columns[columnIndex].cards.splice(cardIndex, 1);
                } else {
                    return;
                }
                break;
        }
        onUpdateBoard(copyBoard);
    }

    return (<div className='columns'>
        {board.columns.map(column =>
            <Column
                key={column.id}
                column={column}
                onUpdateColumn={handleUpdateColumn}
                onDeleteColumn={handleDeleteColumn}
                onMoveCard={handleMoveCard}
            />
        )}
        <div>
            {canAddNewColumn() && <button onClick={handleNewColumn}>
                Add New Column
            </button>}
        </div>
    </div>);
}
