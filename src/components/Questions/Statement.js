import React, { useState } from 'react'
import { Grid, TextField, Button, InputLabel, Typography, Paper } from '@material-ui/core'

const Statement = () => {

    const [fields, setFields] = useState([{ value: null }])

    function handleChange(i, e)  {
        const values = [...fields]
        values[i].value = e.target.value
        setFields(values)
    }

    function handleAdd() {
        const values = [...fields]
        values.push({ value: null })
        setFields(values)
    }

    function handleRemove(i) {
        const values= [...fields]
        values.splice(i, 1)
        setFields(values)
    }
    return (
        <Grid item xs={12} sm={12}>
            <Typography>Statements - <Button onClick = {() => handleAdd()}>Add</Button></Typography>
            
            {
                fields.map((field, index) => {
                    return (
                        <Paper key={`${field}-${index}`}>
                        <InputLabel>{index + 1}</InputLabel>
                        <TextField name ={`Statement-${index + 1}`} value={field.value} onChange={e => handleChange(index, e)} type="text" placeholder="Statement" variant="outlined" />
                        {index > 0 && <Button onClick={() => handleRemove(index)}>Remove</Button>}
                        </Paper>
                    )
                })
            }
            
            
        </Grid>
    )
}

export default Statement