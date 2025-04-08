import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "~/store"

interface TokenState {
  value: string
}

const initialState: TokenState = {
  value: "",
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
        state.value = action.payload
    },
    clearToken: (state) => {
      state.value = ""
    },
  },
})

export const { setToken, clearToken } = tokenSlice.actions

export const selectToken = (state: RootState) => state.token.value

export default tokenSlice.reducer