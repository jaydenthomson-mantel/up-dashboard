import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "~/store"

interface SignInState {
    signedIn: boolean
    accessToken: string
    isValidAccessToken: boolean
}

const initialState: SignInState = {
    signedIn: false,
    accessToken: "",
    isValidAccessToken: false
}

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
            state.signedIn = true
            state.isValidAccessToken = true
        },
        signOut: (state) => {
            state.accessToken = ""
            state.signedIn = false
            state.isValidAccessToken = false;
        },
    },
})

export const { signIn, signOut } = signInSlice.actions
export const selectToken = (state: RootState) => state.signIn.accessToken
export const selectSignIn = (state: RootState) => state.signIn.signedIn
export default signInSlice.reducer