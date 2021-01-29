import React from 'react'
import {Card, CardContent, Typography}  from '@material-ui/core';

function Boxes({title, cases, total}) {
    return (
        <Card>


            <CardContent>

                <Typography className = "box__title" color = "textSecondary">{title}</Typography>

                <h2 className = "box__cases">{cases}</h2>

                <Typography className = "box__total" color = "textSecondary">{total} Total</Typography>


            </CardContent>

        </Card>


    )
}

export default Boxes
