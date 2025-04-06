import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import type { Dispatch } from "react";

interface TokenProps {
    token: string;
    setToken: Dispatch<React.SetStateAction<string>>;
}

const validTokenRegex = /^up:yeah:[a-zA-Z0-9]+$/

export default function Token(props: Readonly<TokenProps>) {
    const { isError, errorReason } = (() => {
        if (props.token === "") {
            return { isError: true, errorReason: "Token is empty." };
        }
        if (!validTokenRegex.test(props.token)) {
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
                value={props.token}
                onChange={(e) => props.setToken(e.target.value)}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">
                            <IconButton aria-label="clear token" onClick={() => props.setToken("")}>
                                <Clear />
                            </IconButton>    
                        </InputAdornment>,
                    },
                }}
            />
            
        </div>
    )
}