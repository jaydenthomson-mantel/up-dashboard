import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "~/store"
import { ping } from "~/utils/pingApi"

interface SignInState {
    signedIn: boolean
    accessToken: string
    isValidAccessToken: boolean
    error: string | null
}

const initialState: SignInState = {
    signedIn: false,
    accessToken: "",
    isValidAccessToken: false,
    error: null
}

const validTokenRegex = /^up:yeah:[a-zA-Z0-9]+$/

export const validateAccessToken = (accessToken: string) => {
    if (accessToken === "") {
        return { error: true, errorReason: "Access token is empty." };
    }
    if (!validTokenRegex.test(accessToken)) {
        return { error: true, errorReason: "Access token is not in the expected format." };
    }
    return { error: false, errorReason: "" };
};

// Async thunk for validating token and signing in
export const validateAndSignIn = createAsyncThunk(
    'signIn/validateAndSignIn',
    async (accessToken: string, { rejectWithValue }) => {
        // Validate token without async call
        const { error, errorReason } = validateAccessToken(accessToken)
        if (error === true) {
            return rejectWithValue(errorReason)
        }

        // Validate with the API
        const pingResult = await ping(accessToken);
        if (pingResult.error) {
            return rejectWithValue("Access token was not accepted by UP API");
        }

        // Token is valid
        return accessToken;
    }
)

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        signOut: (state) => {
            state.accessToken = ""
            state.signedIn = false
            state.isValidAccessToken = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(validateAndSignIn.fulfilled, (state, action: PayloadAction<string>) => {
                state.accessToken = action.payload
                state.signedIn = true
                state.isValidAccessToken = true
                state.error = null
            })
            .addCase(validateAndSignIn.rejected, (state, action) => {
                state.accessToken = ""
                state.signedIn = false
                state.isValidAccessToken = false
                state.error = action.payload as string
            })
    }
})

export const { signOut } = signInSlice.actions
export const selectSignInState = (state: RootState) => ({
    accessToken: state.signIn.accessToken,
    signedIn: state.signIn.signedIn
})
export const selectSignInError = (state: RootState) => state.signIn.error
export default signInSlice.reducer