import React from "react";
import {Button, Card, Grid, Group, ScrollArea, Text, TextInput} from "@mantine/core";
import './search-controls.scss'
interface SearchControlsProps {
    label: string;
    placeholder: string;
    smallerLabel: string;
    onClickSearch: () => void;
    onChange: (e:any) => void;
    buttonLabel: string;

}
const SearchControls:React.FC<SearchControlsProps> = ({label, placeholder, smallerLabel, onClickSearch, onChange, buttonLabel}) => {
    return (
        <React.Fragment>
            <TextInput
                onChange={onChange}
                label={label}
                description={smallerLabel}
                placeholder={placeholder}
                style={{display:'inline-block', marginRight: '2em'}}
                classNames={{input:'fucking-search-bar'}}
            />
            <div style={{display:'inline-block', marginRight:'2em', marginTop:'1.5em'}}>
                <Button
                    className='grow-on-hover'
                    variant="light" color="lightgray"
                    fullWidth mt="md" radius="md"
                    onClick={onClickSearch}
                    style={{backgroundColor: 'rgba(255, 208, 18, 0.6)',  marginRight: '2em !important'}}
                >
                    {buttonLabel}
                </Button>
            </div>
        </React.Fragment>
    )
}

export default SearchControls;