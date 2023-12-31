import { Box, Button, Dialog, DialogActions, Stack, Typography } from "@mui/material";
import LostGif from "../../assets/lost.gif";
import WinGif from "../../assets/victory.gif";
import * as React from "react";

export const ResultDialog = ({didWin, civ, isOpen, handleClose}) => {
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
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth
                maxWidth={"xs"}
            >
                <Stack gap={2} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} sx={{padding: "20px"}}>
                    { didWin ?
                        <WinDisplay />
                        : <LoseDisplay />
                    }
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" sx={{height: "3em", width: "15em" }}>Play Again</Button>
                </DialogActions>
                    
                </Stack>
            </Dialog>
        </>
    );
}