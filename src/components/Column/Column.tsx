import {ColumnModel} from "../../types/ColumnModel";
import {ComponentHeader} from "../componentHeader/componentHeader";
import './Column.css';

interface ColumnProps {
    column: ColumnModel,
    onUpdateColumn: (copyColumn: ColumnModel) => void;
    onDeleteColumn: (id: string) => void;
}

export const Column = (props: ColumnProps) => {
    const {column, onUpdateColumn, onDeleteColumn} = props;

    const handleDeleteColumn = () => {
        onDeleteColumn(column.id);
    }

    const handleUpdateColumnName = (newName: string) => {
        const copyColumn = {...column};
        copyColumn.name = newName;
        onUpdateColumn(copyColumn);
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
        </div>
    )
}
