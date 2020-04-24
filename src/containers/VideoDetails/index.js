import React from 'react'
import PageHeader from '../../components/PageHeader'
import AvatarWithMenu from '../../components/AvatarWithMenu'
import { connect } from 'react-redux'
import { MainContainer } from '../../style/MainContainer'
import { Button } from '@material-ui/core'
import { routes } from '../Router'
import VideoCard from '../../components/VideoCard'
import { push } from 'connected-react-router'
import { getUserUploads } from '../../actions/videos'

function VideoDetails(props) {
    return (
        <MainContainer>
            <PageHeader>{props.loggedUser.id ?
                <AvatarWithMenu img={props.loggedUser.profilePicture} /> :
                <Button color="primary" onClick={props.goToLogin}>
                    Entrar
                </Button>
            }</PageHeader>
            <VideoCard
                src={props.highlightedVideo.url}
                profilePicture={props.highlightedUser.profilePicture}
                name={props.highlightedUser.name}
                title={props.highlightedVideo.title}
                description={props.highlightedVideo.description}
                onPictureClick={() => props.getUserUploads(props.highlightedVideo.userId)}
                controls
                autoplay
            ></VideoCard>
        </MainContainer>
    )
}

const mapStateToProps = state => ({
    loggedUser: state.users.logged,
    highlightedUser: state.users.highlighted,
    highlightedVideo: state.videos.highlighted

})

const mapDispatchToProps = dispatch => ({
    goToLogin: () => dispatch(push(routes.login)),
    goHome: () => dispatch(push(routes.root)),
    getUserUploads: id => dispatch(getUserUploads(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetails)