import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { edittodo, detailstodo } from './apicall'; // Import Add Todo Function
import { useForm } from "react-hook-form"; // Import React Hook Form 
import { useNavigate, useParams } from "react-router-dom"; // Import Use Navigate
import { useSelector, useDispatch } from "react-redux"; // Import Use Dispatch
import { CircularProgress } from "@mui/material"; // Circle Loader 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Wrapper from '../Common/Wrapper';
import { EditLocationOutlined } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query' // Import for useQuery 
import Formloader from '../Common/Formloader';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const Edit = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [com, setCom] = useState('');

    // Get product For Single Value (Start)
    const getCustomer = async () => {
        try {
            const response = await dispatch(detailstodo(id));

            const reg = {

                Title: response?.payload?.Title,
                Description: response?.payload?.Description,
                Enddate: response?.payload?.Enddate,
                isCompleted: response?.payload?.isCompleted



            };

            reset(reg)
            setCom(response?.payload?.isCompleted);

        } catch (error) {
            console.log(error);
        }
    };

    useQuery({ queryFn: getCustomer }) // This line of code work as same as useEffect()
    // Get product For Single Value (End)

    const onSubmit = async (data) => {

        setLoading(true);

        const reg = {
            Title: data.Title,
            Description: data.Description,
            Enddate: data.Enddate,
            isCompleted: com
        };

        try {
            const response = await dispatch(edittodo({ data: reg, id }));
            console.log("Resss", response);
            if (response && response?.type === 'edittodo/fulfilled') {
                navigate('/todolist')
                setLoading(false)
            } else {
                //navigate('/adduser')
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);

        }
    }

    return (
        <>
            <Wrapper>

                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 15,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <EditIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Edit Your Todo
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="Title"
                                            required
                                            fullWidth
                                            id="title"
                                            label="Title"
                                            autoFocus
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontSize: '1rem' } // Adjust the font size as needed
                                            }}
                                            {...register("Title", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Title must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.Title && (
                                            <p style={{ color: 'red' }}>{errors.Title.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="Description"
                                            required
                                            fullWidth
                                            id="Description"
                                            label="Description"
                                            autoFocus
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontSize: '1rem' } // Adjust the font size as needed
                                            }}
                                            {...register("Description", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Description must be atleast 5 characters"
                                                }
                                            })}
                                        />
                                        {errors?.Description && (
                                            <p style={{ color: 'red' }}>{errors.Description.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            type="date"
                                            name="Enddate"
                                            required
                                            fullWidth
                                            id="Enddate"
                                            label="End date"
                                            autoFocus
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontSize: '1rem' } // Adjust the font size as needed
                                            }}
                                            {...register("Enddate", {
                                                required: "This field is Required",
                                            })}
                                        />
                                        {errors?.Enddate && (
                                            <p style={{ color: 'red' }}>{errors.Enddate.message}</p>
                                        )}
                                    </Grid>

                                    {/*Handle Radio Area Start*/}
                                    <FormControl sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        marginLeft: 3,
                                        marginTop: 3
                                    }}>
                                        <FormLabel id="demo-radio-buttons-group-label">Is Complete</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            value={com} // Use state variable for value
                                            onChange={(e) => setCom(e.target.value)} // Update state on change
                                        >
                                            <FormControlLabel value="False" control={<Radio />} label="False" />
                                            <FormControlLabel value="True" control={<Radio />} label="True" />
                                        </RadioGroup>
                                    </FormControl>
                                    {/*Handle Radio Area Start*/}

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? <Formloader/> : "Edit"}
                                </Button>

                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Container>
                </ThemeProvider>

            </Wrapper>
        </>
    )
}

export default Edit