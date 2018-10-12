

export default function navTitle (state = {title: '首页'}, action) {
    switch (action.type) {
        case 'CHANGE_TITLE':
            return {...state, title: action.text}
        default:
            return state
    }
}
