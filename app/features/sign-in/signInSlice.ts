import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "~/store"

interface SignInState {
    signedIn: boolean
    token: string
}

const initialState: SignInState = {
    signedIn: false,
    token: "",
}

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            state.signedIn = true
        },
        signOut: (state) => {
            state.token = ""
            state.signedIn = false
        },
    },
})

export const { signIn, signOut } = signInSlice.actions
export const selectToken = (state: RootState) => state.signIn.token
export const selectSignIn = (state: RootState) => state.signIn.signedIn
export default signInSlice.reducer