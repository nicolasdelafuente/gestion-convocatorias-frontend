import { Card, CardActionArea, CardContent } from "@mui/material";
import React, { useState } from "react";
import { FormatoProps } from "../Formatos";
import FormatoDialog from "../../../components/FormatoDialog/FormatoDialog";

const FormatoCard = ({ _id, nombreDelFormato, campos }: FormatoProps) => {

    const [showFormatoDialog, setShowFormatoDialog] = useState(false)


    return (
        <>
            <Card
                sx={{
                    borderTop: 15,
                    borderTopColor: "#56A42C",
                    width: '20rem'
                }}>
                <CardActionArea
                    onClick={() => setShowFormatoDialog(true)}
                >
                    <CardContent>
                        <h5>{nombreDelFormato}</h5>
                    </CardContent>
                </CardActionArea>
            </Card>

            <FormatoDialog
                formatoData={{_id, nombreDelFormato, campos}}
                showDialogState={{showFormatoDialog, setShowFormatoDialog}}
            />
        </>
    )
}

export default FormatoCard;