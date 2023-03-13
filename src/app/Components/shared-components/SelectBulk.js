import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import baseURL from "src/app/common/baseURL";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from "@mui/material/Backdrop";
import FuseLoading from "@fuse/core/FuseLoading";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from '@mui/material/Snackbar';
import Button from "@mui/material/Button";
import axios from "axios";

function SelectBulk() {
    const token = localStorage.getItem("token");
    const [dataArray, setDataArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setstatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const auth = localStorage.getItem("user");
    useEffect(() => {
        document.title = "Bulk Validation Kleanify";
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/getalllistandsegment/${JSON.parse(auth).apiKey}`);
                setDataArray(response.data.Array);
                console.log(response.data.Array)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const setSelection = async (event) => {
        console.log(event.target.value)
        setSelectedOption(event.target.value);

    };
    const handleSubmit = async () => {
        setstatus(true)
        try {
            const response = await axios.get(`${baseURL}/getsegment/${selectedOption.id}/${selectedOption.type}/${JSON.parse(auth)._id}/${selectedOption.name}`);
            console.log(response.data)
            if (response.data.Result == "Fail") {
                setOpen(true);
                setMessage(`Sorry, you don’t have enough email validation credits. Buy more credits here.`);
                setstatus(false)
            } else {
                setstatus(false)
                setOpen(true);
                setMessage('Email validation started. You will get an email alert once it’s completed.');
                //navigate('/bulk-email-validation')
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    if (loading) {
        return (
            <div className="flex w-full items-center justify-center h-full">
                <FuseLoading />
            </div>
        );
    }

    return (
        <div className="relative opacity-90 h-full  flex flex-col flex-auto min-w-0 overflow-hidden">
            <div className="relative pt-32 pb-48 sm:pt-80 sm:pb-96 px-24 sm:px-64 overflow-hidden">
                {/* <svg
                    className="-z-1 absolute inset-0 pointer-events-none"
                    viewBox="0 0 960 540"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMax slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <Box
                        component="g"
                        sx={{ color: "#e8d78a" }}
                        className="opacity-100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="100"
                    >
                        <circle r="234" cx="196" cy="23" />
                        <circle r="234" cx="790" cy="491" />
                    </Box>
                </svg> */}
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.05 } }}
                    ></motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                        className="flex justify-center mt-40 sm:mt-80"
                    >
                        <Paper className="flex flex-col lg:flex-row max-w-sm lg:max-w-xl overflow-hidden">
                            <div className="p-24 sm:p-32 lg:p-40 justify-center">
                                <Typography
                                    className="mt-8 text-xl leading-relaxed"
                                    color="text.secondary"
                                >
                                    Kleanify can check your subscriber list from Klaviyo account and can automatically suppress invalid or expired emails.
                                    <p className="mt-7">
                                        To start cleaning, please select a list or segment. Depending on the size, this can take a few minutes. You will be alerted through email once it's done.

                                    </p>
                                </Typography>
                                <form
                                    name="loginForm"
                                    noValidate
                                    className="flex flex-col justify-center w-full lg:w-1/2 mt-32"

                                >
                                    <FormControl>
                                        <InputLabel>List or Segment</InputLabel>
                                        <Select value={selectedOption} onChange={setSelection}>
                                            {dataArray.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                        <Backdrop
                                            sx={{
                                                opacity: 0,
                                                color: "#00000",
                                                zIndex: (theme) => theme.zIndex.drawer + 1,
                                            }}
                                            open={status}
                                        >
                                            <CircularProgress color="success" />
                                        </Backdrop>
                                        {message == "Sorry, you don’t have enough email validation credits. Buy more credits here."
                                            ? (<Snackbar
                                                open={open}
                                                autoHideDuration={6000}
                                                onClose={() => setOpen(false)}
                                                message={message}
                                                action={
                                                    <Button color="warning" size="medium" onClick={() => {
                                                        navigate('/buy-credits')
                                                    }}>
                                                        Buy
                                                    </Button>
                                                }
                                                
                                            />) : (<Snackbar
                                                open={open}
                                                autoHideDuration={6000}
                                                onClose={() => setOpen(false)}
                                                message={message}
                                                severity="success"
                                            />)
                                        }

                                        <Button
                                            className="bg-green p-8 w-1/2 text-lg mt-11 text-white rounded-12"
                                            onClick={() => handleSubmit()}
                                        >
                                            Start Validation
                                        </Button>
                                    </FormControl>


                                </form>
                            </div>
                        </Paper>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default SelectBulk;
