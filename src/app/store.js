import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi'
import authReducer from '../features/auth/authSlice'
import { roleApi } from '../features/roles/roleApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, roleApi.middleware),
})
