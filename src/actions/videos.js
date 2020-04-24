import axios from 'axios'
import { routes } from '../containers/Router'
import { push } from 'connected-react-router'
import { highlightUser } from './users'

const baseUrl = "https://93gwg8jly6.execute-api.us-east-1.amazonaws.com/v1"

export function storeVideos(videos) {
    return ({
        type: 'STORE_VIDEOS',
        payload: { videos }
    })
}

export function storeHighlightedVideo(video) {
    return ({
        type: 'STORE_HIGHLIGHTED_VIDEO',
        payload: { video }
    })
}

export const updatePageNumber = newPageNumber => ({
    type: 'UPDATE_PAGE_NUMBER',
    payload: { newPageNumber }
})

export const getAllVideos = (page) => dispatch => {

    axios
        .get(`${baseUrl}/videos/all?page=${page}`)
        .then(res => {
            dispatch(storeVideos(res.data.videos))
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const highlightVideo = (id) => dispatch => {
    axios
        .get(`${baseUrl}/videos/${id}`)
        .then(res => {
            dispatch(storeHighlightedVideo({
                id: res.data.id,
                title: res.data.title,
                url: res.data.url,
                description: res.data.description,
                userId: res.data.user_id
            }))
            dispatch(highlightUser(res.data.user_id))
            dispatch(push(routes.videoDetails))
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const getUserUploads = (id) => dispatch => {
    axios
        .get(`${baseUrl}/videos?user=${id}`)
        .then(res => {
            dispatch(storeVideos(res.data.videos))
            dispatch(push(routes.root))
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const deleteVideo = id => dispatch => {
    const token = window.localStorage.getItem("token")
    const headers = { Authorization: token }

    axios
        .delete(`${baseUrl}/videos/${id}`, { headers })
        .then(() => dispatch(getUserUploads(id)))
        .catch(err => alert(err.message))

}

export const uploadVideo = video => dispatch => {

    const token = window.localStorage.getItem("token")
    const headers = { Authorization: token }

    axios
        .post(
            `${baseUrl}/videos/upload`,
            video,
            { headers }
        )
        .then(res => {
            dispatch(push(routes.root))
            alert(res.message)
        })
        .catch(err => {
            alert(err.message)
        })
}

export const changePage = newPageNumber => dispatch => {
    dispatch(getAllVideos(newPageNumber))
    dispatch(updatePageNumber(newPageNumber))

}