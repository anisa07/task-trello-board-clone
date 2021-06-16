import {ColumnModel} from "../../types/ColumnModel";
import {BoardModel} from "../../types/BoardModel";
import {createColumn} from "../../helpers/boardHelper";
import './Columns.css';
import { Column } from "../Column/Column";

interface ColumnsProps {
    board: BoardModel,
    onUpdateBoard: (copyBoard: BoardModel) => void
}

export const Columns = (props: ColumnsProps) => {
    const {board, onUpdateBoard} = props;

    const handleUpdateColumn = (column: ColumnModel) => {
        const copyBoard = {...board};
        const columnIndex = copyBoard.columns.findIndex(c => column.id === c.id);
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
        const columnIndex = copyBoard.columns.findIndex(c => columnId === c.id);
        copyBoard.columns.splice(columnIndex, 1);
        onUpdateBoard(copyBoard);
    }

    const boardExists = () => !!board.id;

    const canAddNewColumn = () =>
        boardExists()
        && (board.columns.length === 0
        || board.columns[board.columns.length - 1].name);

    return (<div className='columns'>
        {board.columns.map(column =>
            <Column
                key={column.id}
                column={column}
                onUpdateColumn={handleUpdateColumn}
                onDeleteColumn={handleDeleteColumn}
            />
        )}
        <div>
            {canAddNewColumn() && <button onClick={handleNewColumn}>
                Add New Column
            </button>}
        </div>
    </div>);
}
