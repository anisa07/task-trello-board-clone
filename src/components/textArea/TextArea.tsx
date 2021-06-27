import {ChangeEvent, useState} from "react";
import './TextArea.css';

interface TextAreaProps {
    label?: string;
    value: string;
    onChangeValue: (newValue: string) => void;
}

export const TextArea = (props: TextAreaProps) => {
    const {label} = props;
    const [value, setValue] = useState(props.value);

    const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target?.value);
    }

    const handleBlur = () => {
        props.onChangeValue(value);
    }

    return <div className="textarea">
        <label htmlFor={label}>{label}</label>
        <textarea id={label} value={value} onBlur={handleBlur} onChange={handleChangeValue} cols={3}/>
    </div>
}
