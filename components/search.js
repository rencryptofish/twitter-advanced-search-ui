import { useForm, Controller } from "react-hook-form";
//import { Input, Select, MenuItem, TextField, Box } from "@mui/material";

import * as React from 'react';
//import { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField';
import { FormGroup, Switch, RadioGroup, Radio, FormLabel } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import Button from "@mui/material";
//import Mui from "./Mui";

const defaultValues = {
    select: "",
    input: "",
    replies: true,
    links: true,
};


function encodeQueryData(data) {
    console.log(data);
    const ret = [];
    for (let d in data)
        if (data[d] !== '') {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }

    return ret.join('&');
}


function twitter_search(data) {
    const query = encodeQueryData(data);
    console.log(query);


    //window.open("https://www.codexworld.com/", "_self");
}



export default function SearchForm() {
    const { handleSubmit, reset, watch, control, register } = useForm({ defaultValues });
    const onSubmit = data => twitter_search(data);

    // <Mui control={control} />

    //const [value, setValue] = React.useState<Date | null>(null);

    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);

    const handleFromDateChange = (newValue) => {
        setFromDate(newValue);
    };
    const handleToDateChange = (newValue) => {
        setToDate(newValue);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Controller
                render={
                    ({ field }) => <Select {...field}>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                    </Select>
                }
                control={control}
                name="select"
                defaultValue={10}
            /> */}

            <FormGroup>
                <FormLabel>Words (operators: `&quot;`exact`&quot;`, OR, -)</FormLabel>
                <TextField variant="outlined" {...register("allWords", { required: false, maxLength: 20 })} placeholder="Search query" />

                <TextField variant="outlined" {...register("hashtags", { required: false, maxLength: 20 })} placeholder="These hashtags" />

                <FormLabel>Accounts (separate with spaces: @a @b)</FormLabel>
                <TextField variant="outlined" {...register("fromAccounts", { required: false, maxLength: 20 })} placeholder="From these accounts" />
                <TextField variant="outlined" {...register("toAccounts", { required: false, maxLength: 20 })} placeholder="To these accounts" />
                <TextField variant="outlined" {...register("mentionAccounts", { required: false, maxLength: 20 })} placeholder="Mentioning these accounts" />


                <FormLabel>Filters</FormLabel>
                {/* <FormControlLabel control={<Switch defaultChecked />} label="Replies" />
                <FormControlLabel control={<Switch defaultChecked />} label="Links" /> */}

                <Controller
                    name="replies"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    checked={field.value}
                                />
                            }
                            label="Replies"
                        />
                    )}
                />

                <Controller
                    name="links"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    checked={field.value}
                                />
                            }
                            label="Links"
                        />
                    )}
                />

                <TextField variant="outlined" {...register("fromAccounts", { required: false, maxLength: 20 })} placeholder="Minimum replies" />
                <TextField variant="outlined" {...register("toAccounts", { required: false, maxLength: 20 })} placeholder="Minimum likes" />
                <TextField variant="outlined" {...register("mentionAccounts", { required: false, maxLength: 20 })} placeholder="Minimum retweets" />

                <FormLabel>Dates</FormLabel>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            label="From date"
                            value={fromDate}
                            onChange={handleFromDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            label="To date"
                            value={toDate}
                            onChange={handleToDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
            </FormGroup>

            <input type="submit" value="Search" />
        </form>
    );
}



