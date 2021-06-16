import {ChangeEvent, useEffect, useState} from "react";
import './Name.css';

interface NameProps {
    id?: string,
    buttonText?: string,
    placeholder?: string,
    label?: string,
    error?: string,
    value: string,
    onChangeValue: (v: string) => void;
}

export const Name = (props: NameProps) => {
    const {id, buttonText, placeholder, label, error, value: savedValue, onChangeValue} = props;
    const [editMode, setEditMode] = useState(true);
    const [value, setValue] = useState(savedValue);
   
    useEffect(() => {
        if (!savedValue) {
            setEditMode(true);
        }
    }, [savedValue])

    useEffect(() => {
        if (value !== savedValue) {
            setValue(savedValue);
        }
    }, [savedValue, editMode])


    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const handleUpdate = () => {
        if (value) {
            onChangeValue(value);
        }
        toggleEditMode();
    }

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <div className={"name-container"}>
            <label htmlFor={id}>{label}</label>
            {
                editMode
                    ? <div className={"input-container"}>
                        <input
                            id={id}
                            type={'text'}
                            placeholder={placeholder}
                            value={value}
                            onChange={handleChangeValue}
                            onBlur={handleUpdate}
                        />
                        <button onClick={handleUpdate}>&#10004; {buttonText}</button>
                    </div>
                    : <p onClick={toggleEditMode}>Click to &#9998; {value}</p>
            }
            <p className={'error'}>{error}</p>
        </div>
    )
}
