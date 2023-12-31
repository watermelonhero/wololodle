import * as React from "react";
import { Stack } from "@mui/material";

import "./instructions.css";

export const Instructions = () => {

    return (
        <>
            <Stack gap={1} alignItems={"center"}>
                <div>Guess the <b>civilization</b> in 5 tries.</div>
                <div>Each guess must be a valid AoE2 <b>civilization</b>.</div>
                <div>Each incorrect guess will reveal another clue.</div>
                <div>Try to guess the <b>civilization</b> in the least number of tries.</div>
            </Stack>
        </>
    )
}