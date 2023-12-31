import * as React from "react";
import { Button, Stack, TextField, Box, Typography } from "@mui/material";

export const CivForm = ({numGuesses, onSubmitForm}) => {
    const [guessText, setGuessText] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setGuessText("");
        onSubmitForm(guessText);
    }

    return(
        <form onSubmit={handleSubmit}>
            <Stack flexDirection={"column"} gap={1} marginBottom={"15px"}>
                <TextField size={"medium"} value={guessText} variant="outlined" placeholder="Enter a civilization" onChange={(e) => setGuessText(e.target.value)}/>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Button variant="contained" type="submit" sx={{height: "3.5em", width: "30%"}}>Guess</Button>
                    <Box>
                        <Typography fontWeight={700}>Incorrect guesses: {numGuesses} / 5</Typography>
                    </Box>
                </Stack>
            </Stack>
        </form>
    )
}