import * as React from "react";
import { Box, Button, Paper, List, ListItem, ListItemText, MobileStepper, Typography, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

export const ClueStepper = ({clues, currClue}) => {
    const theme = useTheme();
    const [activeClue, setActiveClue] = React.useState(0);
    const [maxSteps, setMaxSteps] = React.useState(1);

    React.useEffect(() => {
        setMaxSteps(clues.length);
        setActiveClue(currClue);
    }, [clues, currClue]);

    const handleNext = React.useCallback(() => {
        setActiveClue((prevActiveClue) => prevActiveClue + 1);
      }, [setActiveClue]);
    
    const handleBack = React.useCallback(() => {
        setActiveClue((prevActiveClue) => prevActiveClue - 1);
    }, [setActiveClue]);


    return (
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
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