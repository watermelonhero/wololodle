import * as React from "react";
import { Box, Button, Paper, List, ListItem, ListItemText, MobileStepper, Typography, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

/**
 * ClueStepper Component:
 * Renders a stepper for displaying clues with navigation buttons.
 * @param {Array<Array<string>>} clues - Array of arrays containing clues for the game.
 * @param {number} currClue - Index of the current clue being displayed.
 * @returns {JSX.Element} - Returns a component displaying clues with navigation buttons for the game.
 */
export const ClueStepper = ({clues, currClue}) => {
    const theme = useTheme(); // Accessing the theme for arrow direction
    const [activeClue, setActiveClue] = React.useState(0);
    const [maxSteps, setMaxSteps] = React.useState(1);

    // Setup the initial state of the stepper
    React.useEffect(() => {
        setMaxSteps(clues.length);
        setActiveClue(currClue);
    }, [clues, currClue]);

    // Handle next clue
    const handleNext = React.useCallback(() => {
        // Increment active clue if it's not the last clue
        setActiveClue((prevActiveClue) => prevActiveClue + 1);
      }, [setActiveClue]);
    
      // Handle previous clue
    const handleBack = React.useCallback(() => {
        // Decrement active clue if it's not the first clue
        setActiveClue((prevActiveClue) => prevActiveClue - 1);
    }, [setActiveClue]);


    return (
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Display header for clue */}
        <Paper
            square
            elevation={0}
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
            }}
        >
            <Typography fontWeight={700} sx={{fontSize: 20}}>{`Clue ${activeClue + 1}`}</Typography>
        </Paper>
        {/* Display the clues */}
        <Box sx={{ height: 200, width: '100%', p: 2 }}>
            <List sx={{display: "flex", flexFlow: "column wrap", height: 200, justifyContent: "top", alignItems: "center"}}>
                { clues.length > 0 ? clues[activeClue].map((clue, idx) => 
                    <ListItem 
                        key={clue}
                        disableGutters 
                        disablePadding
                        sx={{width: "auto"}}
                    >
                        <ListItemText primary={clue}/>
                    </ListItem>
                ) : null}
            </List>
        </Box>
        {/* Mobile stepper for navigation */}
        <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeClue}
            nextButton={
            <Button
                size="small"
                onClick={handleNext}
                disabled={activeClue === maxSteps - 1}
            >
                Next
                {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
                ) : (
                <KeyboardArrowRight />
                )}
            </Button>
            }
            backButton={
            <Button size="small" onClick={handleBack} disabled={activeClue === 0}>
                {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
                ) : (
                <KeyboardArrowLeft />
                )}
                Back
            </Button>
            }
        />
        </Box>
    );
}