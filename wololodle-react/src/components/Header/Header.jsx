import { Paper, Typography } from "@mui/material";
import * as React from "react";

export const Header = () => {

    return (
        <>
            <Paper 
                elevation={0}
                sx={{
                    bgcolor: "#f0d153", 
                    marginBottom: "15px", 
                    padding: "10px", 
                    borderBottomRightRadius: 0, 
                    borderBottomLeftRadius: 0
                }}>
                <Typography fontSize={30} fontWeight={700}>Wololodle</Typography>
            </Paper>
        </>
    );
}