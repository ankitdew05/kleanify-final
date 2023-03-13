import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useParams, useNavigate } from "react-router-dom";
import baseURL from "../common/baseURL";
import FuseLoading from "@fuse/core/FuseLoading";
import axios from "axios";
function Feature2() {
  const token = localStorage.getItem("token");

  const auth = localStorage.getItem("user");
  useEffect(() => {
    document.title = "Onboarding to Kleanify";
    fetchsegments();
  }, []);
  const [period, setPeriod] = useState("month");
  const [status, setstatus] = useState(false)
  const [segment, setSegment] = useState([]);
  const params = useParams();
  const UserId = params.id;
  const navigate = useNavigate();
  async function handleSubmit1() {
    console.log(selectedOption)
    if (selectedOption == null) {
      alert("Please Select Some Id")
    } else {
      let segmentID = selectedOption.id;
      let name = selectedOption.name
      let result = await fetch(`${baseURL}/segment/${JSON.parse(auth)._id}`, {
        method: "put",
        body: JSON.stringify({ segmentID, name }),
        headers: {
          "Content-Type": "application/json",
          "authorization": JSON.parse(token)
        },
      });
      result = await result.json();
      console.log(result)
      if (result.result == "Pass") {
        alert("Succesfully Submited Segment Id");
        navigate("/list-cleaning");
      } else {
        alert("Opps! Not Submited Segment Id");
      }
    }


  }

  const { control, formState, setError, setValue } = useForm({
    mode: "onChange",
  });

  const { isValid, dirtyFields, errors } = formState;

  const fetchsegments = async () => {
    try {
      setstatus(true)
      const response = await axios.get(`${baseURL}/getallsegment/${JSON.parse(auth).apiKey}`);
      setSegment(response.data.Array);
      console.log("Segments", response.data.Array)
      setstatus(false)
    } catch (error) {
      console.error(error);
    }
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const setSelection = async (event) => {
    console.log(event.target.value)
    setSelectedOption(event.target.value);
  };

  if (status) {
    return (
      <div className="flex w-full bg-[#FFF6CF]  min-h-full">
        <FuseLoading />
      </div>
    );
  }

  return (
    <div className="relative bg-[#F1F5F9] flex flex-col flex-auto min-w-0 overflow-hidden">
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
          >
            <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
              Clean Unengaged Subscribers
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
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
                  Kleanify cleans your unengaged subscribers from Klaviyo
                  account automatically every week.
                  <p className="mt-7">
                    To start cleaning, please set-up a dynamic segment in
                    Klaviyo by following{" "}
                    <a href="https://kleanify.notion.site/Setup-Segment-in-Klaviyo-for-Unengaged-Subscribers-Kleanify-6ce6ac5f1cf649f086c71db9a2a034b0" target="_blank">
                      <spam className="underline">this guide</spam></a>. This takes
                    less than 5 mins and is a one-time process. Copy the segment
                    id and paste it below.
                  </p>
                </Typography>
                <div

                  className="flex flex-col justify-center w-full lg:w-1/2 mt-32"
                >
                  <FormControl>
                    <InputLabel>Segment Id</InputLabel>
                    <Select value={selectedOption} onChange={setSelection}>
                      {segment.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.name}
                        </MenuItem>
                      ))}

                    </Select>
                  </FormControl>
                  <div className="grid grid-cols-2 gap-x-7">
                    <Button
                      style={{
                        backgroundColor: "#FCB900",
                      }}
                      variant="contained"
                      color="secondary"
                      className=" w-full mt-16"
                      aria-label="Sign in"
                      type="submit"
                      size="large"
                      onClick={() => handleSubmit1()}
                    >
                      Finish
                    </Button>
                    <Link to='/'><Button
                      style={{
                        backgroundColor: "#FCB900",
                      }}
                      variant="contained"
                      color="secondary"
                      className=" w-full mt-16"
                      aria-label="Sign in"
                      type="submit"
                      size="large"
                    >
                      Do it Later
                    </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Paper>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Feature2;
