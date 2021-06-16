import { BoardHeader } from "../../components/boardHeader/BoardHeader"
import {Columns} from "../../components/columns/Columns";
import {useState} from "react";
import {BoardModel} from "../../types/BoardModel";
import {setEmptyBoard} from "../../helpers/boardHelper";
import { v4 as uuidv4 } from 'uuid';

export const Board = () => {
    const [board, setBoard] = useState<BoardModel>(setEmptyBoard());

    const handleDeleteBoard = () => {
        setBoard(setEmptyBoard());
    }

    const handleUpdateBoard = (boardUpdate: BoardModel) => {
        if (boardUpdate.id) {
            setBoard(boardUpdate);
        } else {
            setBoard({...boardUpdate, id: uuidv4()})
        }
    }

    return (
        <div className="board-container">
            <h4>To start work with a board, create its name and press enter</h4>
            <BoardHeader
                board={board}
                onUpdateBoard={handleUpdateBoard}
                onDeleteBoard={handleDeleteBoard}
            />
            <Columns />
        </div>
    )
}
