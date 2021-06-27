import './MoveControl.css';
import {MoveDirection} from "../../types/MoveDirection";

interface MoveControlProps {
    onMoveCard: (direction: MoveDirection) => void;
}

export const MoveControl = (props: MoveControlProps) => {
    const {onMoveCard} = props;

    const handleMoveLeft = () => {
        onMoveCard(MoveDirection.LEFT)
    }
    const handleMoveRight = () => {
        onMoveCard(MoveDirection.RIGHT)
    }
    const handleMoveTop = () => {
        onMoveCard(MoveDirection.TOP)
    }
    const handleMoveBottom = () => {
        onMoveCard(MoveDirection.BOTTOM)
    }

    return (
        <div className={'moveContainer'}>
            <button onClick={handleMoveLeft}>Left</button>
            <div className={'center'}>
                <button onClick={handleMoveTop}>Top</button>
                Move Card
                <button onClick={handleMoveBottom}>Bottom</button>
            </div>
            <button onClick={handleMoveRight}>Right</button>
        </div>
    )
}
