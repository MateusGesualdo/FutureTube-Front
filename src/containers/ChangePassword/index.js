import React from 'react'
import PageHeader from '../../components/PageHeader'
import { MainContainer } from '../../style/MainContainer'
import AvatarWithMenu from '../../components/AvatarWithMenu'
import { Button } from '@material-ui/core'
import { Form } from '../../components/Form'
import { connect } from 'react-redux'
import { changePassword } from '../../actions/users'
import { push } from 'connected-react-router'
import { routes } from '../Router'

function ChangePassword(props) {

    const [currentPassword, setCurrentPassword] = React.useState()
    const [newPassword, setNewPassword] = React.useState()

    const handleFormSubmission = ev => {
        ev.preventDefault()
        props.changePassword(currentPassword, newPassword)
    }

    return (
        <MainContainer>
            <PageHeader>{props.loggedUser.id ?
                <AvatarWithMenu img={props.loggedUser.profilePicture} /> :
                <Button color="primary" onClick={props.goToLogin}>
                    Entrar
                </Button>
            }</PageHeader>
            <Form onSubmit={handleFormSubmission} buttonText="Alterar Senha" fields={[
                {
                    "label": "Senha atual",
                    "type": "password",
                    "value": currentPassword,
                    "onChange": ev => setCurrentPassword(ev.target.value)
                },
                {
                    "label": "Nova senha",
                    "type": "password",
                    "value": newPassword,
                    "onChange": ev => setNewPassword(ev.target.value)
                }
            ]} />
        </MainContainer>


    )
}

const mapStateToProps = state => ({
    loggedUser: state.users.logged
})

const mapDispatchToProps = dispatch => ({
    changePassword: (currentPassword, newPassword) => dispatch(changePassword(currentPassword, newPassword)),
    goToLogin: () => dispatch(push(routes.login))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)