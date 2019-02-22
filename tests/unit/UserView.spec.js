/* eslint-disable no-undef */

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import UserView from '@/views/UserView'
import VUserSearchForm from '@/components/VUserSearchForm'
import VUserProfile from '@/components/VUserProfile'
import intialState from '@/store/state'
import userFixture from './fixtures/user'
import actions from '@/store/actions'

//read up on this...
jest.mock('@/store/actions')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('UserView', () => {
  let state
  const build = () => {
    const wrapper = shallowMount(UserView, {
      localVue,
      store: new Vuex.Store({ state, actions })
    })
    return {
      wrapper,
      userSearchForm: () => wrapper.find(VUserSearchForm),
      userProfile: () => wrapper.find(VUserProfile)
    }
  }
  beforeEach(() => {
    jest.resetAllMocks()
    state = { ...intialState }
  })
  it('seraches for a user when received "submitted" action', () => {
    // arrange
    const expectedUser = 'kur'
    const { userSearchForm } = build()

    // act as if userSearchForm emits the "submitted" event
    userSearchForm().vm.$emit('submitted', expectedUser)

    // assert
    expect(actions.SEARCH_USER).toHaveBeenCalled()
    // calls[0] is Vuex object itself, [1] is the payload
    expect(actions.SEARCH_USER.mock.calls[0][1]).toEqual({ username: expectedUser })
  })
  it('renders the component', () => {
    // assert
    expect(build().wrapper.html()).toMatchSnapshot()
  })
  it('renders direct decendents', () => {
    // arrange
    const { userSearchForm, userProfile } = build()

    // assert
    expect(userSearchForm().exists()).toBe(true)
    expect(userProfile().exists()).toBe(true)
  })
  it('passes name prop from UserView to VUserProfile', () => {
    // arrange
    const { userProfile, wrapper } = build()
    // assert
    expect(userProfile().vm.aProp).toBe(wrapper.vm.aProp)
  })
  it('passes user prop from state to VUserProfile', () => {
    state.user = userFixture
    const { userProfile } = build()
    // assert
    expect(userProfile().vm.user).toBe(state.user)
  })
})
