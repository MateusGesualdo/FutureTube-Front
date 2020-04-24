const initialState = {
    list: [],
    highlighted: {
        id: '',
        title: '',
        url: '',
        description: '',
        userId: ''
    },
    currentPage: 1
}

export default function videos(state = initialState, action) {
    switch (action.type) {
        case 'STORE_VIDEOS':
            return { ...state, list: action.payload.videos }
        case 'STORE_HIGHLIGHTED_VIDEO':
            return { ...state, highlighted: action.payload.video }
            case 'UPDATE_PAGE_NUMBER':
                return { ...state, currentPage: action.payload.newPageNumber }
        default: return state

    }
}
