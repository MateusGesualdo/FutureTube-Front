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
import { uploadVideo } from '../../actions/videos'

function UploadVideo(props) {

    const [title, setTitle] = React.useState()
    const [description, setDescription] = React.useState()
    const [url, setUrl] = React.useState()

    const handleFormSubmission = ev => {
        ev.preventDefault()
        props.uploadVideo({ title, description, url })
    }

    return (
        <MainContainer>
            <PageHeader>{props.loggedUser.id ?
                <AvatarWithMenu img={props.loggedUser.profilePicture} /> :
                <Button color="primary" onClick={props.goToLogin}>
                    Entrar
                </Button>
            }</PageHeader>
            <Form onSubmit={handleFormSubmission} buttonText="Salvar" fields={[
                {
                    "label": "Título",
                    "value": title,
                    "onChange": ev => setTitle(ev.target.value)
                },
                {
                    "label": "Descrição",
                    "value": description,
                    "onChange": ev => setDescription(ev.target.value)
                },
                {
                    "label": "Url",
                    "value": url,
                    "onChange": ev => setUrl(ev.target.value)
                }
            ]} />
        </MainContainer>


    )
}

const mapStateToProps = state => ({
    loggedUser: state.users.logged
})

const mapDispatchToProps = dispatch => ({
    uploadVideo: (newVideo) => dispatch(uploadVideo(newVideo)),
    goToLogin: () => dispatch(push(routes.login))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideo)