import React from 'react'
import {Card, CardContent, Typography}  from '@material-ui/core';
import './Boxes.css'
import numeral from "numeral";

function Boxes({title, cases, total, ...props}) {
    return (
        <Card className = "card" onClick = {props.onClick}>


            <CardContent style={{backgroundColor: 'white'}}>

                <Typography className = "box__title" color = "aquamarine">{title}</Typography>

                <h2 className = "box__cases">{numeral(cases).format("0,0")}</h2>

                <Typography className = "box__total" color = "aquamarine">{numeral(total).format("0,0")} Total</Typography>

            </CardContent>

        </Card>


    )
}

export default Boxes
