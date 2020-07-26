import React from 'react'
import { Card, CardContent, Typography} from "@material-ui/core";
import "./InfoBox.css"

function InfoBox({title, cases, isRed, active, total, ...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} 
        ${isRed && "infoBox__red"}`}>
         <CardContent>
             {/*Title */}
             <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
             {/*+120k number of cases */}
              <h2 className="infoBox__cases">{cases}</h2>
              {/*1.2M in total */}
              <Typography className="infoBox__total" color="textSecondary">{total} Total
              </Typography>
         </CardContent>
        </Card>
    )
}

export default InfoBox
