import {createStore} from 'redux'
import reducer from '../reducer'

const state = {
    title: '首页'
}

const store = createStore(reducer)

export default store