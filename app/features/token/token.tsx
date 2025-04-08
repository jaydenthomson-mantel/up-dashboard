import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { setToken, clearToken } from "./tokenSlice";

const validTokenRegex = /^up:yeah:[a-zA-Z0-9]+$/

export default function Token() {
    const token = useAppSelector((state) => state.token.value)
    const dispatch = useAppDispatch()

    const { isError, errorReason } = (() => {
        if (token === "") {
            return { isError: true, errorReason: "Token is empty." };
        }
        if (!validTokenRegex.test(token)) {
            return { isError: true, errorReason: "Token is not in the expected format." };
        }
        return { isError: false, errorReason: "" };
    })();

    return (
        <div>
            <TextField
                error={isError}
                id="token-text-field"
                label="Up API Token"
                helperText={errorReason}
                value={token}
                onChange={(e) => dispatch(setToken(e.target.value))}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">
                            <IconButton aria-label="clear token" onClick={() => dispatch(clearToken())}>
                                <Clear />
                            </IconButton>    
                        </InputAdornment>,
                    },
                }}
            />
        </div>
    )
}