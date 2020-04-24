import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../Router'
import { MainContainer } from '../../style/MainContainer';
import { Form } from '../../components/Form';
import PageHeader from '../../components/PageHeader'
import { Button } from '@material-ui/core';
import {login} from '../../actions/users' 

const Login = props => {

    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()

    const handleFormSubmission = ev => {
        ev.preventDefault()
        props.login({email, password})
    }

    return (
        <MainContainer>

            <PageHeader>
                <Button
                    variant="text"
                    color="primary"
                    onClick={props.goToSignup}
                >
                   Cadastre-se
                </Button>
            </PageHeader>

            <Form onSubmit={handleFormSubmission} buttonText="Entrar" fields={[
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
                }
            ]} />



        </MainContainer>

    )
}

const mapDispatchToProps = dispatch => ({
    goHome: () => dispatch(push(routes.root)),
    goToSignup: () => dispatch(push(routes.signup)),
    login: (user) => dispatch(login(user))
})

export default connect(null, mapDispatchToProps)(Login)