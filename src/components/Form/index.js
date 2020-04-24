import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const StyledForm = styled.form`
    width: 300px;
    margin: 1em auto;
    display: grid;
    grid-gap: 5px;
    padding: 5px;
    border-radius: 5px;
    background-color: whitesmoke;
`

export const Form = props => <StyledForm onSubmit={props.onSubmit}>

    {props.fields.map(field => <TextField
        required
        variant="filled"
        type={field.type}
        label={field.label}
        pattern={field.pattern}
        value={field.value}
        onChange={field.onChange}
    />)}

    <Button type="submit" color="primary" variant="contained">{props.buttonText}</Button>

</StyledForm>