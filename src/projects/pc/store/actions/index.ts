import { ActionTree } from 'vuex'
// actions
import * as Common from './commonActions'
import * as Home from './homeActions'

const Actions: ActionTree<object, any> = {
    ...Common,
    ...Home
}

export default Actions
