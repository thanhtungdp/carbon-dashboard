import { useStaticRendering } from 'mobx-react'
import authStore from './authStore'
import userStore from './userStore'
import testStore from './testStore'

const stores = {
  authStore,
  userStore,
  testStore
}

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let newStores = {}

export function initializeStores (initialData) {
  Object.keys(stores).map(key => {
    if (isServer) {
      newStores[key] = new stores[key](isServer, initialData)
    } else if (typeof newStores[key] === 'undefined') {
      newStores[key] = new stores[key](isServer, initialData)
    }
  })
  return newStores
}
