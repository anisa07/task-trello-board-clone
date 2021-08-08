import {createColumn} from "../../helpers/boardHelper";
import {Column} from "../column/Column";
import {findIndexById} from "../../helpers/arrayHelper";
import {DragDropContext, DragUpdate} from "react-beautiful-dnd";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {BoardModel} from "../../types/BoardModel";
import {ColumnModel} from "../../types/ColumnModel";

interface ColumnsProps {
    board: BoardModel,
    onUpdateBoard: (copyBoard: BoardModel) => void
}

const useStyles = makeStyles({
    columns: {
        display: 'flex',
        overflow: "scroll"
    },
});

export const Columns = (props: ColumnsProps) => {
    const {board, onUpdateBoard} = props;
    const classes = useStyles();

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

    const handleDrop = (e: DragUpdate) => {
        const {destination, source} = e;
        const boardCopy = {...board}
        const destId = destination?.droppableId;
        const sourceId = source?.droppableId;
        const findDestinationIndex = boardCopy.columns.findIndex(c => c.id === destId);
        const findSourceIndex = boardCopy.columns.findIndex(c => c.id === sourceId);
        const destIndex = destination?.index;
        const sourceIndex = source?.index;
        if (findSourceIndex > -1 && findDestinationIndex > -1 && destIndex !== undefined && sourceIndex !== undefined) {
            const card = boardCopy.columns[findSourceIndex].cards[sourceIndex];
            boardCopy.columns[findDestinationIndex].cards.splice(destIndex, 0, card);
            if (destId === sourceId) {
                boardCopy.columns[findSourceIndex].cards.splice(destIndex < sourceIndex ? sourceIndex + 1 : sourceIndex, 1);
            } else {
                boardCopy.columns[findSourceIndex].cards.splice(sourceIndex, 1);
            }
            onUpdateBoard(boardCopy);
        }
    }

    return (
        <div className={classes.columns}>
            <DragDropContext
                onDragEnd={handleDrop}
            >
                {board.columns.map((column, index) =>
                    <Column
                        key={column.id}
                        index={index}
                        column={column}
                        onUpdateColumn={handleUpdateColumn}
                        onDeleteColumn={handleDeleteColumn}
                    />
                )}
            </DragDropContext>

            <div>
                {canAddNewColumn() && <Button onClick={handleNewColumn}>
                    Add New Column
                </Button>}
            </div>
        </div>);
}
