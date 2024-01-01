import * as React from "react";
import { Stack, Typography } from "@mui/material";

/**
 * Instructions Component:
 * Instructions componet displays the given instructions to play the game
 * @returns {JSX.Element} The instructions to be displayed to the user
 */
export const Instructions = () => {
    return (
        <>
            <Stack gap={1} alignItems={"center"}>
                <Typography>Guess the <b>civilization</b> in 5 tries.</Typography>
                <Typography>Each guess must be a valid AoE2 <b>civilization</b>.</Typography>
                <Typography>Each incorrect guess will reveal another clue.</Typography>
                <Typography>Try to guess the <b>civilization</b> in the least number of tries.</Typography>
            </Stack>
        </>
    )
}