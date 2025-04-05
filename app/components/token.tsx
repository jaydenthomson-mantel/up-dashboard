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

    const maskedToken = props.token.replace(/[a-zA-Z0-9]/g, '•');

    return (
        <TextField
            fullWidth
            error={isError}
            id="token-text-field"
            label="Up API Token"
            helperText={errorReason}
            value={maskedToken}
            onChange={(e) => props.setToken(e.target.value)}
        />
    )
}