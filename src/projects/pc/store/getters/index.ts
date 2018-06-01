import { GetterTree } from 'vuex'
import State from '../state'
// getters
import * as Home from './homeGetters'

export const Getter: GetterTree<State, object> = {
    ...Home
}

export default Getter
