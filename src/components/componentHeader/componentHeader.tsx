import './componentHeader.css';
import {EditableName} from '@anisa07/design-package-app-test';

interface ComponentHeaderProps {
    name: string;
    label?: string;
    buttonLabel?: string;
    onDeleteComponent: () => void;
    onUpdateComponentName: (newName: string) => void;
}

export const ComponentHeader = (props: ComponentHeaderProps) => {
    const {name, label, buttonLabel, onUpdateComponentName, onDeleteComponent} = props;

    const handleUpdateComponent = (newName: string) => {
        onUpdateComponentName(newName)
    }

    return (
        <div className="board-header">
            <EditableName
                label={label}
                value={name}
                onChangeValue={handleUpdateComponent}
            />
            <button onClick={onDeleteComponent} className={'component-delete'}>&#10007; {buttonLabel}</button>
        </div>
    )
}
