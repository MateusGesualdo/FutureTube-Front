const initialState = {
    logged: {
        id: "",
        name: "",
        profilePicture: ""
    },
    highlighted: {
        id: "",
        name: "",
        profilePicture: ""
    }

}

export default function users(state = initialState, action) {
    switch (action.type) {
        case 'STORE_LOGGED_USER':
            return { ...state, logged: action.payload.user }
        case 'STORE_HIGHLIGHTED_USER':
            return { ...state, highlighted: action.payload.user }
        case 'LOGOUT':
            return {
                ...state,
                logged: {
                    id: "",
                    name: "",
                    profilePicture: ""
                }
            }
        case 'CLEAR_HIGHLIGHTED_USER':
            return {
                ...state,
                highlighted: {
                    id: "",
                    name: "",
                    profilePicture: ""
                }
            }
        default: return state

    }
}