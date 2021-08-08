import {ComponentHeader} from '@anisa07/design-package-app-test';
import {Cards} from "../cards/Cards";
import {makeStyles} from "@material-ui/core/styles";
import { useCommonStyles } from "@anisa07/design-package-app-test";
import {ColumnModel} from "../../types/ColumnModel";

interface ColumnProps {
    index: number,
    column: ColumnModel,
    onUpdateColumn: (copyColumn: ColumnModel) => void;
    onDeleteColumn: (id: string) => void;
}

const useStyles = makeStyles({
    column: {
        width: '300px',
        marginRight: '1rem',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '550px',
        minWidth: '250px'
    },
});

export const Column = (props: ColumnProps) => {
    const {column, onUpdateColumn, onDeleteColumn} = props;
    const classes = useStyles();
    const commonStyles = useCommonStyles();

    const handleDeleteColumn = () => {
        onDeleteColumn(column.id);
    }

    const handleUpdateColumnName = (name: string) => {
        const copyColumn = {...column, name};
        onUpdateColumn(copyColumn);
    }

    return (
        <div className={`${classes.column} ${commonStyles.border}`}>
            <ComponentHeader
                name={column.name}
                label="Column Name"
                buttonLabel="Delete Column"
                onDeleteComponent={handleDeleteColumn}
                onUpdateComponentName={handleUpdateColumnName}
            />
            <div>
                <Cards
                    column={column}
                    onUpdateColumn={onUpdateColumn}
                />
            </div>
        </div>
    )
}
