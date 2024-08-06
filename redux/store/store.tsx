import { configureStore } from '@reduxjs/toolkit'
import LoginSlice, { loginSlice } from '../slice/LoginSlice'
import ActionsSlice from '../slice/ActionsSlice'
import SetupSlice from '../slice/SetupSlice'
// ...

export const store = configureStore({
  reducer: {
    login:LoginSlice,
    actions:ActionsSlice,
    setup:SetupSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch