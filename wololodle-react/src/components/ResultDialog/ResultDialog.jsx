import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import LostGif from "../../assets/lost.gif";
import WinGif from "../../assets/victory.gif";
import * as React from "react";

/**
 * ResultDialog Component:
 * Renders a modal acknowledging the user's win or loss in the game.
 * @param {boolean} didWin - Indicates whether the user won the game (true) or lost (false).
 * @param {string} civ - The name of the civilization (either guessed correctly or the correct answer).
 * @param {boolean} isOpen - Controls the visibility of the result modal (true for open, false for closed).
 * @param {function} handleClose - Callback function to handle closing the result modal.
 * @returns {JSX.Element} - Returns a dialog/modal component displaying game result acknowledgment.
 */
export const ResultDialog = ({didWin, civ, isOpen, handleClose}) => {
    // Component displaying the winning message
    const WinDisplay = () => (
        <>
            <Box 
                component={"img"}
                src={WinGif}
                sx={{
                    maxWidth: 150,
                    maxHeight: 150,
                }}
            />
            <Typography fontWeight={700} fontSize={25}>Congrats!</Typography>
            <Typography fontSize={18}>You found the civilization: <Typography variant="span" fontWeight={700} color={"#5372F0"}>{civ}</Typography></Typography>
        </>
    );

    // Component displaying the losing message
    const LoseDisplay = () => (
        <>
            <Box 
                component={"img"}
                src={LostGif}
                sx={{
                    maxWidth: 150,
                    maxHeight: 150,
                }}
            />
            <Typography fontWeight={700} fontSize={25}>Game Over!</Typography>
            <Typography fontSize={18}>The correct civilization was: <Typography variant="span" fontWeight={700} color={"#5372F0"}>{civ}</Typography></Typography>
        </>
    )

    return (
        // Dialog component displaying the result modal
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
        {/* Stack to organize content */}
        <Stack gap={2} alignItems="center" justifyContent="center" padding="20px">
            {/* Conditionally render WinDisplay or LoseDisplay based on didWin */}
            {didWin ? <WinDisplay /> : <LoseDisplay />}
            {/* Button to play again */}
            <Button onClick={handleClose} variant="contained" sx={{ height: "3em", width: "15em" }}>Play Again</Button>
        </Stack>
        </Dialog>
    );
}