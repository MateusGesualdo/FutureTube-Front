import axios from 'axios'
import { routes } from '../containers/Router'
import { push } from 'connected-react-router'

const baseUrl = "https://93gwg8jly6.execute-api.us-east-1.amazonaws.com/v1"

const storeLoggedUser = user => ({
    type: 'STORE_LOGGED_USER',
    payload: { user }
})

function storeHighlightedUser(user) {
    return ({
        type: 'STORE_HIGHLIGHTED_USER',
        payload: { user }
    })
}

export const signup = newUser => dispatch => {

    axios
        .post(
            `${baseUrl}/users/signup`,
            newUser
        )
        .then(res => {
            window.localStorage.setItem("token", res.data.token)
            dispatch(storeLoggedUser(res.data.user))
            dispatch(push(routes.root))
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const login = user => dispatch => {

    const headers = { Authorization: user.token || '' }
    axios
        .post(
            `${baseUrl}/users/login`,
            user,
            { headers }
        )
        .then(res => {
            window.localStorage.setItem("token", res.data.token)
            dispatch(storeLoggedUser(res.data.user))
            dispatch(push(routes.root))
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const logout = () => dispatch => {
    window.localStorage.clear()
    dispatch({ type: "LOGOUT" })
}

export const highlightUser = (id) => dispatch => {
    axios
        .get(`${baseUrl}/users/${id}`)
        .then(res => {
            dispatch(storeHighlightedUser({
                id: res.data.user.id,
                name: res.data.user.name,
                profilePicture: res.data.user.profile_picture
            }))
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const clearHighlightedUser = () => ({
    type: "CLEAR_HIGHLIGHTED_USER"
})

export const changePassword = (currentPassword, newPassword) => dispatch => {

    const token = window.localStorage.getItem("token")
    const headers = { "Authorization": token }
    const data = { currentPassword, newPassword }


    axios
        .post(`${baseUrl}/users/password`, data, { headers })
        .then(res => {
            window.localStorage.setItem("token", res.data.token)
            alert(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
}

