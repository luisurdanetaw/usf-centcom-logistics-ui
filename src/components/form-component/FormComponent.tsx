import React, {useState} from 'react';
import {
    Button,
    TextInput,
} from "@mantine/core";
import './form-component.scss'
import {sendForm} from "../../services/api/form";


interface FormComponentProps {
    fields: string [];
    url: string;
}

const FormComponent: React.FC<FormComponentProps> = ({ fields, url }) => {

    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

    const handleInputChange = (fieldName: string, value: string) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };


    const onSubmit = async () => {
        const params = { ...inputValues, facilityId: localStorage.getItem('facility-id')};
        const success = await sendForm(url, params);
        success ? alert("Inventory successfully updated") : alert("Unable to update inventory");
    }


    return (
        <React.Fragment>
            {
                fields.map((field, i) => {
                    return (
                        <TextInput
                            key={i}
                            className={"input"}
                            label={field}
                            value={inputValues[field] || ''}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            classNames={{input:'input', label:'label'}}
                        />
                    )
                })
            }
            <Button variant="filled" className={"login-button grow-on-hover"} onClick={onSubmit}>Submit</Button>
        </React.Fragment>
    );
};
export default FormComponent;