import { ComponentHeader } from "../../components/componentHeader/componentHeader"
import {Columns} from "../../components/columns/Columns";
import {useState} from "react";
import {BoardModel} from "../../types/BoardModel";
import {createColumn, setEmptyBoard} from "../../helpers/boardHelper";
import { v4 as uuidv4 } from 'uuid';

export const Board = () => {
    const [board, setBoard] = useState<BoardModel>(setEmptyBoard());

    const handleDeleteBoard = () => {
        setBoard(setEmptyBoard());
    }

    const handleUpdateBoardName = (name: string) => {
        const copyBoard = {...board, name};
        handleUpdateBoard(copyBoard);
    }

    const handleUpdateBoard = (boardUpdate: BoardModel) => {
        if (boardUpdate.id) {
            setBoard({...boardUpdate});
        } else {
            setBoard({...boardUpdate, id: uuidv4(), columns: [createColumn()]})
        }
    }

    return (
        <div className="board-container">
            <h4>To start work with a board, create its name and press enter</h4>
            <ComponentHeader
                name={board.name}
                label="Board Name"
                buttonLabel="Delete Board"
                onDeleteComponent={handleDeleteBoard}
                onUpdateComponentName={handleUpdateBoardName}
            />
            <Columns
                board={board}
                onUpdateBoard={handleUpdateBoard}
            />
        </div>
    )
}
