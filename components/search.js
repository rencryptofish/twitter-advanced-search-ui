import { useForm, Controller } from "react-hook-form";
import * as React from 'react';

import { FormControlLabel, FormGroup, FormLabel, Switch, Stack, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';



const defaultValues = {
    select: "",
    input: "",
    replies: true,
    links: true,
};

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        if (data[d] !== '') {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }

    return ret.join('&');
}


function formatToTwitterQuery(data) {
    console.log(data);

    const formatted_query = [];

    for (let d in data) {
        const value = data[d];
        console.log(d, value);
        if (typeof value == 'string' && value == '') {
            console.log(d, 'empty');
        } else if (d === 'words') {
            formatted_query.push(`(${data[d]})`);
        } else if (d == "hashtags" || d == "mention") {
            const split = data[d].split(' ').join(' OR ')
            formatted_query.push(`(${split})`);
        } else if (d == "from") {
            const split = data[d].split(' ')
            const split_formatted = split.map(s => `from:${s}`)
            const formatted = split_formatted.join(' OR ')
            formatted_query.push(`(${formatted})`);
        } else if (d == "to") {
            const split = data[d].split(' ')
            const split_formatted = split.map(s => `to:${s}`)
            const formatted = split_formatted.join(' OR ')
            formatted_query.push(`(${formatted})`);
        } else if (d == "replies" && !value) {
            console.log('reached!')
            formatted_query.push(`(-filter:replies)`);
        } else if (d == "links" && !value) {
            formatted_query.push(`(-filter:links)`);
        } else if (d == "min_reply") {
            formatted_query.push(`(min_replies:${value})`);
        } else if (d == "min_like") {
            formatted_query.push(`(min_faves:${value})`);
        } else if (d == "min_retweet") {
            formatted_query.push(`(min_retweets:${value})`);
        } else if (d == "from_date") {
            formatted_query.push(`(since:${value})`);
        } else if (d == "to_date") {
            formatted_query.push(`(until:${value})`);
        }
    }

    console.log("formatted", formatted_query);

    const query_data = { "q": formatted_query.join(' ') };
    return encodeQueryData(query_data);
}

function searchTwitter(data) {
    const query = formatToTwitterQuery(data);
    const url = `https://twitter.com/search?f=top&${query}&src=typed_query`;

    window.open(url);
}



export default function SearchForm() {
    const { handleSubmit, reset, watch, control, register } = useForm({ defaultValues });


    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);

    const onSubmit = (data) => {
        if (fromDate !== null) {
            data['from_date'] = fromDate.toISOString().substring(0, 10);
        }
        if (toDate !== null) {
            data['to_date'] = toDate.toISOString().substring(0, 10);
        }

        console.log(data)
        searchTwitter(data);
    };


    const handleFromDateChange = (newValue) => {
        setFromDate(newValue);
    };
    const handleToDateChange = (newValue) => {
        setToDate(newValue);
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <FormLabel>Words (operators: `&quot;`exact`&quot;`, OR, -)</FormLabel>
                <TextField variant="outlined" {...register("words", { required: false, maxLength: 20 })} placeholder="Search query" />
                <TextField variant="outlined" {...register("hashtags", { required: false, maxLength: 20 })} placeholder="These hashtags (separate with spaces: #a #b)" />


                <FormLabel>Accounts (separate with spaces: @a @b)</FormLabel>
                <TextField variant="outlined" {...register("from", { required: false, maxLength: 20 })} placeholder="From these accounts" />
                <TextField variant="outlined" {...register("to", { required: false, maxLength: 20 })} placeholder="To these accounts" />
                <TextField variant="outlined" {...register("mention", { required: false, maxLength: 20 })} placeholder="Mentioning these accounts" />

                <Stack direction="row">
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
                </Stack>



                <TextField variant="outlined" type="number" {...register("min_reply", { required: false, maxLength: 20 })} placeholder="Minimum replies" />
                <TextField variant="outlined" type="number" {...register("min_like", { required: false, maxLength: 20 })} placeholder="Minimum likes" />
                <TextField variant="outlined" type="number" {...register("min_retweet", { required: false, maxLength: 20 })} placeholder="Minimum retweets" />

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
                            InputLabelProps={{ shrink: true }}
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



