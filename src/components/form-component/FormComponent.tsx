import React, {useEffect, useState} from 'react';
import {
    Button,
    TextInput,
} from "@mantine/core";
import './form-component.scss'
import {sendForm} from "../../services/api/form";
import {removeUnderscoresAndCapitalize} from "../../services/utilities/strings";


interface FormComponentProps {
    fields: string [];
    url: string;
}

const FormComponent: React.FC<FormComponentProps> = ({ fields, url }) => {

    useEffect(() => {
        const facility = localStorage.getItem("request-facility-name") ?? '';
        const supply = localStorage.getItem('request-supply-name') ?? '';
        handleInputChange("cargo_description", supply);
        handleInputChange("facility_name", facility)
    }, [])

    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

    const handleInputChange = (fieldName: string, value: string) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };
    const onSubmit = async () => {
        const currentDate: Date = new Date();

// To get the current date as a string
        const currentDateAsString: string = currentDate.toISOString().split('T')[0];
        const params = (fields.length >= 3)  ?
            {
                ...inputValues,
                facility_id: localStorage.getItem('facility-id'),
                requestor: 'l',
                requestor_id: '1',
                date_received: currentDateAsString
            } :
            {
                ...inputValues,
                facility_id: '1'
            }

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
                            label={removeUnderscoresAndCapitalize(field)}
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