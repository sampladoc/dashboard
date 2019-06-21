import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        val: '',
        name: 'hai',
    });
    
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function handleChange(event) {
        
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
        props.onChange(event.target.value, props.data.dataType)
    }

    return (
        <form className={classes.root} autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor={props.data.title}>
                    {props.data.title}
                </InputLabel>
                <Select
                    value={values.val}
                    onChange={handleChange}
                    input={<OutlinedInput labelWidth={labelWidth} name={props.data.title} id={props.data.title} />}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {props.data.values.map((val, index) => (
                        <MenuItem key={index} value={val}>{props.data.names[index]}</MenuItem>
                    ))}
                </Select>
            </FormControl>

        </form>
    );
}
