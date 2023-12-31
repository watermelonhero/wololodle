import * as React from "react";
import { Paper, Container, Box, Stack, Divider } from "@mui/material";
import { CivForm, ClueStepper, Header, Instructions, ResultDialog } from "../../components";

import "./home.css";

var civData = require("../../data/civ-list.json");
const civList = civData.civList;

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
        const { civilization, clues } = civList[Math.floor(Math.random() * 3)];
        setCiv(civilization.toLowerCase());

        const { clue1, clue2, clue3: clueThree, clue4, clue5 } = clues[0];
        
        const clue3 = clueThree[0];
        const civBonusLen = clue3.civbonus.length;
        const civUniqueTechLen = clue3.civuniquetech.length;

        const shuffledClue1 = [...new Set(clue1.sort(() => Math.random() - 0.3))];
        const shuffledClue2 = [...new Set(clue2.sort(() => Math.random() - 0.5))];
        const shuffledClue3A = clue3.civbonus[Math.floor(Math.random() * civBonusLen)];
        const shuffledClue3B = clue3.civuniquetech[Math.floor(Math.random() * civUniqueTechLen)];

        const normalizedClue1 = shuffledClue1.slice(0,3);
        const normalizedClue2 = shuffledClue2.slice(0,2);
        const normalizedClue3 = [shuffledClue3A, shuffledClue3B];
        const tempAllClues = [normalizedClue1, normalizedClue2, normalizedClue3, clue4, clue5];

        setAllClues(tempAllClues);
        setCurrClues([normalizedClue1]);
    }, [reset]);

    const handleSubmit = React.useCallback((guess) => {
        let newNumGuess = numGuesses+1;

        const normalizedGuess = guess.toLowerCase();

        if(normalizedGuess === civ) {
            setDidWin(true);
            setResDialogOpen(true);
        } else if(newNumGuess >= 5) {
            setDidWin(false);
            setResDialogOpen(true);
        } else {
            setCurrClues(prevClues => [...prevClues, allClues[newNumGuess]]);
            setNumGuesses(newNumGuess);
        }
    }, [numGuesses, setNumGuesses, allClues, civ]);

    const handleReset = () => {
        setResDialogOpen(false);
        setNumGuesses(0);
        setTimeout(() => {setReset(prevVal => !prevVal)}, 200);
    }

    return (
        <>
            <Container>
                <Paper sx={{margin: "10px"}}>
                    <Header />
                    <Stack className="content-container" gap={2}>
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