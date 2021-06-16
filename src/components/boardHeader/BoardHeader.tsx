import {BoardModel} from "../../types/BoardModel";
import {Name} from "../name/Name";
import './BoardHeader.css';

interface BoardHeaderProps {
    board: BoardModel;
    onDeleteBoard: () => void;
    onUpdateBoard: (b: BoardModel) => void;
}

export const BoardHeader = (props: BoardHeaderProps) => {
    const {board, onUpdateBoard, onDeleteBoard} = props;
    const handleUpdateBoard = (newName: string) => {
        const copyBoard = {...board};
        copyBoard.name = newName;
        onUpdateBoard(copyBoard);
    }
    return (
        <div className="board-header">
            <Name
                label={"Board name"}
                value={board.name}
                onChangeValue={handleUpdateBoard}
            />
            <button onClick={onDeleteBoard} className={'board-delete'}>&#10007; Delete Board</button>
        </div>
    )
}
