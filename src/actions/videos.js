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

export const setLastPage = pageNumber => ({
    type: 'SET_LAST_PAGE',
    payload: { pageNumber }
})

export const getAllVideos = (page) => dispatch => {

    axios
        .get(`${baseUrl}/videos/all?page=${page}`)
        .then(res => {
            if (res.data.videos.length) {
                dispatch(storeVideos(res.data.videos))
                dispatch(updatePageNumber(page))
            } else {
                dispatch(setLastPage(page - 1))
            }
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
    const token = window.localStorage.getItem("token")
    const headers = { Authorization: token }
    const path = id ? `/videos?user=${id}` : '/videos?user'

    axios
        .get(`${baseUrl}${path}`, { headers })
        .then(res => {

            dispatch(storeVideos(res.data.videos))
            dispatch(push(routes.root))
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const deleteVideo = (userId, videoId) => dispatch => {
    const token = window.localStorage.getItem("token")
    const headers = { Authorization: token }

    axios
        .delete(`${baseUrl}/videos/${videoId}`, { headers })
        .then(() => { dispatch(getUserUploads(userId)) })
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
            dispatch(getUserUploads())
        })
        .catch(err => {
            alert(err.message)
        })
}
