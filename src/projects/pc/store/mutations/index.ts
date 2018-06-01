import { MutationTree, Mutation } from 'vuex'
import State from '../state'
// mutations
import * as Common from './commonMutations'
import * as Home from './homeMutations'

const Mutations: MutationTree<State> = {
    ...Common,
    ...Home
}

export default Mutations
