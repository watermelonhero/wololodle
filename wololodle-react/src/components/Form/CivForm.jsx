import * as React from "react";
import { Button, Stack, TextField, Box, Typography } from "@mui/material";

/**
 * CivForm Component:
 * Renders a form allowing users to input their guess for a civilization.
 * @param {number} numGuesses - The count of incorrect guesses made by the user out of 5 allowed guesses.
 * @param {function} onSubmitForm - Callback function invoked upon form submission, passing the user's guess text.
 * @returns {JSX.Element} - Returns a form component for users to input their civilization guess.
 */
export const CivForm = ({numGuesses, onSubmitForm}) => {
    const [guessText, setGuessText] = React.useState("");

    // Handler for when the "Guess" button or "Enter" from the keyboard is pressed
    const handleSubmit = (e) => {
        // Prevent devault behavior when button is clicked
        e.preventDefault();
        // Reset the textfield
        setGuessText("");
        // Call the function passed down from parent to handle submission
        onSubmitForm(guessText);
    }

    return(
        <form onSubmit={handleSubmit}>
            <Stack flexDirection={"column"} gap={1} marginBottom={"15px"}>
                <TextField 
                    size={"medium"} 
                    value={guessText} 
                    variant="outlined" 
                    placeholder="Enter a civilization" 
                    onChange={(e) => setGuessText(e.target.value)}
                />
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