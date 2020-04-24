import React from 'react'
import { connect } from 'react-redux'
import { push, goBack } from 'connected-react-router'
import { routes } from '../Router'
import { MainContainer } from '../../style/MainContainer';
import { Form } from '../../components/Form';
import { signup } from '../../actions/users';
import PageHeader from '../../components/PageHeader';
import { Button } from '@material-ui/core';

const Signup = props => {

    const [name, setName] = React.useState()
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [birthDate, setBirthDate] = React.useState()
    const [profilePicture, setProfilePicture] = React.useState()

    const handleFormSubmission = ev => {
        ev.preventDefault()
        props.signup({
            name,
            email,
            password,
            birthDate,
            profilePicture
        })
    }

    return (
        <MainContainer>

            <PageHeader>
                <Button
                    variant="text"
                    color="primary"
                    onClick={props.goBack}
                >
                    Voltar
                </Button>
            </PageHeader>

            <Form onSubmit={handleFormSubmission} buttonText="Criar Conta" fields={[
                {
                    "label": "nome",
                    "value": name,
                    "onChange": ev => setName(ev.target.value)
                },
                {
                    "label": "email",
                    "type": "email",
                    "value": email,
                    "onChange": ev => setEmail(ev.target.value)
                },
                {
                    "label": "senha",
                    "type": "password",
                    "value": password,
                    "onChange": ev => setPassword(ev.target.value)
                },
                {
                    "label": "data de nascimento",
                    "type": "date",
                    "value": birthDate,
                    "onChange": ev => setBirthDate(ev.target.value)
                },
                {
                    "label": "foto de perfil",
                    "value": profilePicture,
                    "onChange": ev => setProfilePicture(ev.target.value)
                }
            ]} />

        </MainContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    goHome: () => dispatch(push(routes.root)),
    signup: newUser => dispatch(signup(newUser)),
    goBack: () => dispatch(goBack())
})

export default connect(null, mapDispatchToProps)(Signup)