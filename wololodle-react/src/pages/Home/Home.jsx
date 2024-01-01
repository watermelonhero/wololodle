import * as React from "react";
import { Paper, Container, Box, Stack, Divider } from "@mui/material";
import { CivForm, ClueStepper, Header, Instructions, ResultDialog } from "../../components";


var civData = require("../../data/civ-list.json");
const civList = civData.civList;

/**
 * HomePage Component:
 * Renders the main game interface with clues, form for guesses, and result dialog.
 * @returns {JSX.Element} - Returns the main game interface containing clues, guess form, and result dialog.
 */
export const HomePage = () => {
    const [numGuesses, setNumGuesses] = React.useState(0);
    const [currClues, setCurrClues] = React.useState([]);
    const [allClues, setAllClues] = React.useState([]);
    const [resDialogOpen, setResDialogOpen] = React.useState(false);
    const [didWin, setDidWin] = React.useState(false);
    const [civ, setCiv] = React.useState("");
    const [reset, setReset] = React.useState(false);

    // Setup Game
    React.useEffect(() => {
        // Selects a random civilization and initializes clues when the component mounts
        // TODO: When you finish your data, change hardcoded 3 to `civList.length`
        const randomIndex = Math.floor(Math.random() * 3);
        const { civilization, clues } = civList[randomIndex];

        // Sets the selected civilization
        setCiv(civilization.toLowerCase());

        // Destructuring clues for readability
        const { clue1, clue2, clue3: clueThree, clue4, clue5 } = clues[0];
        const clue3 = clueThree[0];

        const civBonusLen = clue3.civbonus.length;
        const civUniqueTechLen = clue3.civuniquetech.length;

        // Shuffles and normalizes different clues for display
        const shuffledClue1 = [...new Set(clue1.sort(() => Math.random() - 0.3))];
        const shuffledClue2 = [...new Set(clue2.sort(() => Math.random() - 0.5))];
        const shuffledClue3A = clue3.civbonus[Math.floor(Math.random() * civBonusLen)];
        const shuffledClue3B = clue3.civuniquetech[Math.floor(Math.random() * civUniqueTechLen)];

        // Slices and prepares clues for display
        const normalizedClue1 = shuffledClue1.slice(0,3);
        const normalizedClue2 = shuffledClue2.slice(0,2);
        const normalizedClue3 = [shuffledClue3A, shuffledClue3B];

        // Constructs all clues array and sets initial current clues
        const tempAllClues = [normalizedClue1, normalizedClue2, normalizedClue3, clue4, clue5];
        setAllClues(tempAllClues);
        setCurrClues([normalizedClue1]);
    }, [reset]);

    const handleSubmit = React.useCallback((guess) => {
        // Handles user's guesses and updates game state accordingly
        const normalizedGuess = guess.toLowerCase();
        const newNumGuess = numGuesses+1;

        if(normalizedGuess === civ) {
            // User guessed correctly
            setDidWin(true);
            setResDialogOpen(true);
        } else if(newNumGuess >= 5) {
            // User exhausted all guesses
            setDidWin(false);
            setResDialogOpen(true);
        } else {
            // Provides a new clue and increments guess count
            setCurrClues(prevClues => [...prevClues, allClues[newNumGuess]]);
            setNumGuesses(newNumGuess);
        }
    }, [numGuesses, setNumGuesses, allClues, civ]);

    const handleReset = () => {
        // Resets the game when the user wants to play again
        setResDialogOpen(false);
        setNumGuesses(0);
        // TEMP: Currently the async behavior of setting state shows the new civ before closing the dialogue
        setTimeout(() => {setReset(prevVal => !prevVal)}, 200);
    }

    return (
        <>
            <Container>
                <Paper sx={{margin: "10px"}}>
                    <Header />
                    <Stack gap={2} sx={{padding: "0 20px"}}>
                        <Instructions />
                        <Divider />
                        <ClueStepper clues={currClues} currClue={numGuesses} />
                        <Box>
                            <CivForm 
                                numGuesses={numGuesses}
                                onSubmitForm={handleSubmit}
                            />
                        </Box>
                    </Stack>
                </Paper>
                <ResultDialog didWin={didWin} civ={civ} isOpen={resDialogOpen} handleClose={handleReset}/>
            </Container>
        </>
    );
}