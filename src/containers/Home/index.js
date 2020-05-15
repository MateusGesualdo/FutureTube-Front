import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../Router'
import { MainContainer } from '../../style/MainContainer'
import PageHeader from '../../components/PageHeader'
import AvatarWithMenu from '../../components/AvatarWithMenu'
import VideoCard from '../../components/VideoCard'
import { Button } from '@material-ui/core'
import { getAllVideos, highlightVideo, deleteVideo } from '../../actions/videos.js'
import styled from 'styled-components'
import { login } from '../../actions/users'

const VideoPannel = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-evenly;
`

const PageButtonsContainer = styled.div`
   display: flex;
   justify-content: space-between;
   margin: 1em;
`

const Home = props => {

    React.useEffect(
        () => {
            const token = window.localStorage.getItem("token")
            if (token) {
                props.login({ token })
            }
        }, [props.highlightedUser.id]
    )

    React.useEffect(
        () => {
            if (!props.highlightedUser.id) {
                props.getAllVideos(props.currentPage)
            }
        }, [props.highlightedUser.id]
    )


    return (
        <MainContainer>
            <PageHeader>{props.loggedUser.id ?
                <AvatarWithMenu img={props.loggedUser.profilePicture} /> :
                <Button color="primary" onClick={props.goToLogin}>
                    Entrar
                </Button>
            }</PageHeader>

            {
                !props.highlightedUser.id &&
                <PageButtonsContainer>
                    {props.currentPage > 1 ? <Button
                        color='primary'
                        onClick={() => props.getAllVideos(props.currentPage - 1)}
                    >
                        Anterior
                    </Button> : <span></span>}
                    {props.currentPage !== props.lastPage && <Button
                        color='primary'
                        onClick={() => props.getAllVideos(props.currentPage + 1)}
                        variant={props.currentPage === props.lastPage ? "disabled" : "text"}
                    >
                            Próxima
                    </Button>}
                </PageButtonsContainer>
            }
            {
                (props.loggedUser.id && props.loggedUser.id === props.highlightedUser.id) &&
                <Button
                    color='primary'
                    onClick={props.goToUploadVideo}
                >
                    Adicionar Vídeo
                </Button>
            }

            <VideoPannel >
                {props.videos[0] && props.videos.map(video =>
                    <VideoCard
                        id={video.id}
                        onClick={() => props.highlightVideo(video.id)}
                        src={video.url}
                        title={video.title}
                        width='300'
                    >
                        {
                            (props.loggedUser.id && props.loggedUser.id === props.highlightedUser.id) &&
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={(ev) => props.deleteVideo(props.loggedUser.id, ev.target.parentNode.parentNode.id)}
                            >
                                Deletar
                            </Button>
                        }
                    </VideoCard>
                )}
            </VideoPannel>
        </MainContainer>
    )
}

const mapStateToProps = state => ({
    loggedUser: state.users.logged,
    highlightedUser: state.users.highlighted,
    videos: state.videos.list,
    currentPage: state.videos.currentPage,
    lastPage: state.videos.lastPage
})

const mapDispatchToProps = dispatch => ({
    goToLogin: () => dispatch(push(routes.login)),
    goToUploadVideo: () => dispatch(push(routes.uploadVideo)),
    login: user => dispatch(login(user)),
    getAllVideos: (page) => dispatch(getAllVideos(page)),
    highlightVideo: (id) => dispatch(highlightVideo(id)),
    deleteVideo: (userId, videoId) => dispatch(deleteVideo(userId, videoId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)