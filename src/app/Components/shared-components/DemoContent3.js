import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { motion } from "framer-motion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import baseURL from "src/app/common/baseURL";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import FuseLoading from "@fuse/core/FuseLoading";

import Collapse from "@mui/material/Collapse";

import { lighten, useTheme } from "@mui/material/styles";
import Section from "./Section";
import DemoHeader from "./DemoHeader";

function DemoContent3() {
  const theme = useTheme();
  const params = useParams();
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [newsub, setnewsub] = useState("0");
  const [nocheck, setnocheck] = useState("0");
  const [noemails, setnoemails] = useState("0");
  const [emailarray, setemailarray] = useState([""]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [camp, setcamp] = useState("");
  const [data, setData] = useState("");
  const [status, setstatus] = useState(false);
  const [stat, setStat] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [checked, setChecked] = useState("");
  useEffect(() => {
    //getBounce();
    //getEmailInfo();
    getData()
      .then((response) => {
        if (response.checked.length !== 0) {
          setstatus(true);
          console.log(status);
        }
        setChecked(response.checked);
        setcamp(response);
        //getResult(response.checked[0].glockId);
      })
      .catch((err) => console.log(err));

    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);

  const handleClick1 = async () => {
    setOpen1(!open1);
  };
  const handleClick2 = async () => {
    setOpen2(!open2);
  };
  const handleClick3 = async () => {
    setOpen3(!open3);
  };
  const handleClick4 = async () => {
    setOpen4(!open4);
  };
  const handleClick5 = async () => {
    setOpen5(!open5);
  };
  const handleClick6 = async () => {
    setOpen6(!open6);
  };

  // const getResult = async (id) => {
  //   axios
  //     .get(
  //       `https://spamtest.glockapps.com/api/v1/GetTestResult?apikey=247a02215ab683f39f51b14647c4a144a6e7720d&TestID=2022-08-02T12:44:36.917+00:00`
  //     )
  //     .then((response) => {
  //       setData(response.data);
  //       console.log("Result Data", response.data);
  //     })
  //     .catch((err) => console.error(err));
  // };
  // const getEmailInfo = async () => {
  //   axios
  //     .get(
  //       `https://spamtest.glockapps.com/api/v1/GetEmailInfo?apikey=247a02215ab683f39f51b14647c4a144a6e7720d&TestID=${params.id}`
  //     )
  //     .then((response) => {
  //       console.log("Email Info Data", response.data);
  //     })
  //     .catch((err) => console.error(err));
  // };

  async function getData() {
    const result = await axios
      .get(`${baseURL}/getsingleCampaign/${params.id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
    return result;
  }
  const check = async (id) => {
    setSpinner(true);
    let result = await fetch(
      `${baseURL}/campaignTest/${JSON.parse(auth).apiKey}/${id}/${
        JSON.parse(auth)._id
      }`,
      {
        method: "get",
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    result = await result.json();
    setSpinner(false);
    console.warn(result);
    window.location.reload;
  };

  if (status) {
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
        initial="hidden"
        animate="show"
      >
        <div className=" sm:col-span-6 lg:col-span-6 grid-cols-4 grid">
          <div className=" flex flex-col col-span-3">
            <Typography className="username text-16 m-20 font-bold text-gray-700 whitespace-nowrap ">
              Campaign ID: {camp.id}
            </Typography>
            <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
              Subject : {camp.subject}
            </Typography>
            <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
              Last Updated : {camp.Updated}
            </Typography>
            <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
              Current Status : {camp.status}
            </Typography>
          </div>

          <div className=" flex flex-row col-span-1 justify-end self-start m-20">
            <Button
              component="a"
              onClick={() => check(camp.id)}
              target="_blank"
              rel="noreferrer noopener"
              role="button"
              className="mx-5"
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "#FFF6CF",
                color: "#000000",
                fontSize: "15px",
              }}
              startIcon={
                <FuseSvgIcon size={16}>
                  heroicons-outline:currency-dollar
                </FuseSvgIcon>
              }
            >
              <Backdrop
                sx={{
                  opacity: 0,
                  color: "#00000",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={spinner}
              >
                <CircularProgress color="success" />
              </Backdrop>
              Test Results
            </Button>
            <Button
              component="a"
              href="/campaign-test"
              target="_blank"
              rel="noreferrer noopener"
              role="button"
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "#FFF6CF",
                color: "#000000",
                fontSize: "15px",
              }}
              startIcon={
                <FuseSvgIcon size={16}>
                  heroicons-outline:currency-dollar
                </FuseSvgIcon>
              }
            >
              Go Back
            </Button>
          </div>
        </div>
        {checked.map((value)=>(
          <div className="sm:col-span-6 lg:col-span-6 grid grid-cols-1 md:grid-cols-4 md:gap-x-24 gap-y-24">
            <div className="sm:col-span-6 lg:col-span-6 grid grid-cols-1 md:grid-cols-4 md:gap-x-24 gap-y-24 ">
              <div className=" sm:col-span-6 lg:col-span-6 grid-cols-4 grid">
                <div className=" flex flex-col col-span-3">
                  <Typography className="username text-24 m-20 mt-0 font-bold text-gray-700 whitespace-nowrap ">
                    Test Results
                  </Typography>
                  <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
                    Tested On : {value.date}
                  </Typography>
                </div>
              </div>
              <motion.div className="sm:col-span-1">
                <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
                  <div className="flex items-center justify-between px-8 pt-12"></div>
                  <div className="text-center mt-8 p-28">
                    <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-green-500">
                      Inbox Rate
                    </Typography>
                    <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-green-500">
                      {value.Result.Stats.InboxRate}
                    </Typography>
                    {/* <Typography className="text-lg font-medium text-green-600">
                  Invalid Email Supressed
                </Typography> */}
                  </div>
                  {/* <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
                <Typography
                  className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                  color="text.secondary"
                >
                  Last 30 Days
                </Typography>
                <Typography
                  className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                  color="text.secondary"
                >
                  View Details
                </Typography>
              </div> */}
                </Paper>
              </motion.div>
              <motion.div className="sm:col-span-1">
                <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
                  <div className="flex items-center justify-between px-8 pt-12"></div>
                  <div className="text-center mt-8 p-28">
                    <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-green-500">
                      Bounce Rate
                    </Typography>

                    <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-green-500">
                    {value.Result.Stats.BounceRate}
                    </Typography>
                    {/* <Typography className="text-lg font-medium text-green-600">
                  Invalid Email Supressed
                </Typography> */}
                  </div>
                  {/* <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
                <Typography
                  className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                  color="text.secondary"
                >
                  Last 30 Days
                </Typography>
                <Typography
                  className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                  color="text.secondary"
                >
                  View Details
                </Typography>
              </div> */}
                </Paper>
              </motion.div>
              <motion.div className="sm:col-span-1">
                <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
                  <div className="flex items-center justify-between px-8 pt-12"></div>
                  <div className="text-center mt-8 p-28">
                    <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-amber-500">
                      Spam Rate
                    </Typography>
                    <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-amber-500">
                    {value.Result.Stats.SpamRate}
                    </Typography>
                    {/* <Typography className="text-lg font-medium text-amber-600">
                  Tests Done
                </Typography> */}
                  </div>
                  {/* <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
                <Typography
                  className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                  color="text.secondary"
                >
                  Last 30 Days
                </Typography>
                <Typography
                  className="px-16 text-xl font-medium tracking-tight leading-6 truncate underline"
                  color="text.secondary"
                >
                  View Details
                </Typography>
              </div> */}
                </Paper>
              </motion.div>
              <motion.div className="sm:col-span-1">
                <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
                  <div className="flex items-center justify-between px-8 pt-12"></div>
                  <div className="text-center mt-8 p-28">
                    <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-blue-500">
                      Missing
                    </Typography>

                    <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-blue-500">
                    {value.Result.Stats.SpamRate}
                    </Typography>
                    {/* <Typography className="text-lg font-medium text-blue-600">
                  Unengaged Subscribers Cleaned
                </Typography> */}
                  </div>
                  {/* <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
                <Typography
                  className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                  color="text.secondary"
                >
                  Last 30 Days
                </Typography>
                <Typography
                  className="px-16 text-xl font-medium tracking-tight leading-6 truncate underline"
                  color="text.secondary"
                >
                  View Details
                </Typography>
              </div> */}
                </Paper>
              </motion.div>
            </div>

            <Typography className="username text-24 m-20 text-gray-700 whitespace-nowrap ">
              Sender IP {value.SenderIP} Reputation
            </Typography>

            <div className="sm:col-span-6 lg:col-span-6 grid  ">
              <div className="flex flex-col bg-green-200 p-24 w-full sm:py-32 sm:px-40">
                <div className="flex justify-between">
                  <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                    Senders Authentication
                  </Typography>
                  <div className="flex">
                    <Typography className="username text-15 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                      DKIM: {value.Result.DKIM}
                    </Typography>
                    <Typography className="username text-15 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                      SPF: {value.SPF}
                    </Typography>
                    <FuseSvgIcon
                      size={24}
                      className=" text-white mt-3"
                      onClick={handleClick1}
                    >
                      heroicons-outline:chevron-down
                    </FuseSvgIcon>
                  </div>
                </div>
              </div>
              <Collapse in={open1}>
                <motion.div className="sm:col-span-1">
                  <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
                    <div className="flex items-center justify-between px-8 pt-12"></div>
                    <div className="text-left mt-8 p-28">
                      <Typography className="text-xl p-10 ">
                        Sender Scores range from 0 to 100. Any Sender Score
                        below 100 means your sender reputation can be improved.
                      </Typography>
                      <Typography className="text-xl pl-10 ">
                        You should use your Sender Score along with other spam
                        filter diagnostics to help guide your email strategy to
                        a place that makes your email subscribers happy and
                        engaged.{" "}
                      </Typography>
                      <Typography className="text-xl p-10 ">
                        Email senders with a Sender Score below 70 typically
                        experience aggressive email filtering applied to every
                        email coming from the IP address attached to the Sender
                        Score. Email senders maintaining a Sender Score above 70
                        typically see filtering criteria applied to individual
                        emails and email campaigns instead of entire IP
                        addresses.{" "}
                      </Typography>
                    </div>
                  </Paper>
                </motion.div>
              </Collapse>
            </div>

            <div className="sm:col-span-6 lg:col-span-6 grid  ">
              <div className="flex flex-col bg-red-200 p-24 w-full sm:py-32 sm:px-40">
                <div className="flex justify-between">
                  <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                    Sender Score
                  </Typography>
                  <div className="flex">
                    <Typography className="username text-16 px-10 mr-10 bg-red-400 rounded-4 text-white whitespace-nowrap font-medium">
                      {value.SenderScore}
                    </Typography>
                    <FuseSvgIcon
                      size={24}
                      className=" text-white mt-3"
                      onClick={handleClick2}
                    >
                      heroicons-outline:chevron-down
                    </FuseSvgIcon>
                  </div>
                </div>
              </div>
              <Collapse in={open2}>
                <motion.div className="sm:col-span-1">
                  <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
                    <div className="flex items-center justify-between px-8 pt-12"></div>
                    <div className="text-left mt-8 p-28">
                      <Typography className="text-xl p-10 ">
                        Sender Scores range from 0 to 100. Any Sender Score
                        below 100 means your sender reputation can be improved.
                      </Typography>
                      <Typography className="text-xl pl-10 ">
                        You should use your Sender Score along with other spam
                        filter diagnostics to help guide your email strategy to
                        a place that makes your email subscribers happy and
                        engaged.{" "}
                      </Typography>
                      <Typography className="text-xl p-10 ">
                        Email senders with a Sender Score below 70 typically
                        experience aggressive email filtering applied to every
                        email coming from the IP address attached to the Sender
                        Score. Email senders maintaining a Sender Score above 70
                        typically see filtering criteria applied to individual
                        emails and email campaigns instead of entire IP
                        addresses.{" "}
                      </Typography>
                    </div>
                  </Paper>
                </motion.div>
              </Collapse>
            </div>

            <div className="sm:col-span-6 lg:col-span-6 grid  ">
              <div className="flex flex-col bg-green-200 p-24 w-full sm:py-32 sm:px-40">
                <div className="flex justify-between">
                  <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                    IP Black Lists
                  </Typography>
                  <div className="flex">
                    <Typography className="username text-16 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                      Clean
                    </Typography>
                    <FuseSvgIcon
                      size={24}
                      className=" text-white mt-3"
                      onClick={handleClick3}
                    >
                      heroicons-outline:chevron-down
                    </FuseSvgIcon>
                  </div>
                </div>
              </div>
              <Collapse in={open3}>
                <motion.div className="sm:col-span-1">
                  <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
                    <div className="flex items-center justify-between px-8 pt-12"></div>
                    <div className="text-left mt-8 p-28">
                      <Typography className="text-xl p-10 ">
                        Your server's IP address {value.SenderIP} is not found in
                        any of 50+ blacklists where GlockApps does an IP check.{" "}
                      </Typography>
                    </div>
                  </Paper>
                </motion.div>
              </Collapse>
            </div>

            <Typography className="username text-24 m-20 text-gray-700 whitespace-nowrap ">
              Spam Filters
            </Typography>

            <div className="sm:col-span-6 lg:col-span-6 grid  ">
              <div className="flex flex-col bg-green-200 p-24 w-full sm:py-32 sm:px-40">
                <div className="flex justify-between">
                  <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                    Google Spam Filter
                  </Typography>
                  <div className="flex">
                    <Typography className="username text-16 px-10 mr-10 bg-red-500 rounded-4 text-white whitespace-nowrap font-medium">
                     SPAM :{value.Result.GoogleApps.Spam}
                    </Typography>
                    <Typography className="username text-16 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                      PHISHY: {value.Result.GoogleApps.Phishy}
                    </Typography>
                    <FuseSvgIcon size={24} className=" text-white mt-3">
                      heroicons-outline:chevron-down
                    </FuseSvgIcon>
                  </div>
                </div>
              </div>
              {/* <Collapse in={open}>
          <motion.div className="sm:col-span-1">
            <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
              <div className="flex items-center justify-between px-8 pt-12"></div>
              <div className="text-left mt-8 p-28">
                <Typography className="text-xl p-10 ">
                Your server's IP address (167.89.29.98) is not found in any of 50+ blacklists where GlockApps does an IP check.              </Typography>
              </div>
            </Paper>
          </motion.div>
          </Collapse> */}
            </div>

            <div className="sm:col-span-6 lg:col-span-6 grid  ">
              <div className="flex flex-col bg-green-200 p-24 w-full sm:py-32 sm:px-40">
                <div className="flex justify-between">
                  <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                    Barracuda Test.
                  </Typography>
                  <div className="flex">
                    <Typography className="username text-16 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                      Score: {value.Result.Barracuda.Score}
                    </Typography>
                    <FuseSvgIcon size={24} className=" text-white mt-3">
                      heroicons-outline:chevron-down
                    </FuseSvgIcon>
                  </div>
                </div>
              </div>
              {/* <Collapse in={open}>
          <motion.div className="sm:col-span-1">
            <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
              <div className="flex items-center justify-between px-8 pt-12"></div>
              <div className="text-left mt-8 p-28">
                <Typography className="text-xl p-10 ">
                Your server's IP address (167.89.29.98) is not found in any of 50+ blacklists where GlockApps does an IP check.              </Typography>
              </div>
            </Paper>
          </motion.div>
          </Collapse> */}
            </div>

            <div className="sm:col-span-6 lg:col-span-6 grid  ">
              <div className="flex flex-col bg-red-200 p-24 w-full sm:py-32 sm:px-40">
                <div className="flex justify-between">
                  <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                    SpamAssassin Test.
                  </Typography>
                  <div className="flex">
                    <Typography className="username text-16 px-10 mr-10 bg-red-500 rounded-4 text-white whitespace-nowrap font-medium">
                      Score: {value.Result.SpamAssassin?.Score}
                    </Typography>
                    <FuseSvgIcon
                      size={24}
                      className=" text-white mt-3"
                      onClick={handleClick4}
                    >
                      heroicons-outline:chevron-down
                    </FuseSvgIcon>
                  </div>
                </div>
              </div>
              <Collapse in={open4}>
                <motion.div className="sm:col-span-1">
                  <Paper className="flex flex-col flex-auto justify-center shadow rounded-2xl w-full h-full overflow-hidden">
                    <div className="text-left mt-8 p-28">
                      <Typography className="text-xl p-10 ">
                        The famous spam filter SpamAssassin. Score: {value.Result.SpamAssassin.Score}. A score
                        above 5 is considered spam. You need to fix "red" and
                        "yellow" points to improve your deliverability.{" "}
                      </Typography>{" "}
                    </div>
                    <div className="flex  px-8 pt-12 m-16 ">
                      <div className=" flex-1">
                        <Typography className="username w-fit text-16 px-10 mr-10  bg-red-500 rounded-4 text-white  font-medium">
                          Score: 6.6
                        </Typography>
                      </div>

                      <Typography className="text-xl p-10 flex-1 ">
                        HOSTED_IMG_FREEM
                      </Typography>
                      <Typography className="text-xl p-10 flex-2 ">
                        Image hosted at large ecomm, CDN or hosting site or
                        redirected, freemail from or reply-to
                      </Typography>
                    </div>
                  </Paper>
                </motion.div>
              </Collapse>
            </div>

            <Typography className="username text-24 m-20 text-gray-700 whitespace-nowrap ">
              Email Providers Delivery Report
            </Typography>

            <motion.div className=" sm:col-span-6 lg:col-span-6  ">
              <Paper className="flex flex-col flex-auto justify-center shadow rounded-2xl w-full h-full overflow-hidden">
                <div className="flex justify-start">
                  <Typography className="text-xl p-10  m-16 ">
                    Amazone Work Mail
                  </Typography>
                  <div className=" flex-1 p-10 m-16">
                    <Typography className="username w-fit text-16 px-10 mr-10  bg-red-500 rounded-4 text-white  font-medium">
                      Score: 6.6
                    </Typography>
                  </div>
                </div>
                <div className="grid grid-cols-8  px-8 pt-12 m-16 mb-5 mt-0 ">
                  <Typography className="text-xl col-span-2 p-10 flex-1 ">
                    Email
                  </Typography>
                  <Typography className="text-xl p-10 flex-1  col-span-1">
                    Deleiver To
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1">
                    Sender IP{" "}
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 first-letter:col-span-1 ">
                    SPF{" "}
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1">
                    Sender Score{" "}
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1">
                    Balck Lists
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1">
                    Delivered in
                  </Typography>
                </div>
                <div className="  px-8 pt-5 m-16 mt-5 grid grid-cols-8 ">
                  <Typography className="text-xl p-10 flex-1 col-span-2">
                    allanb@glockapps.awsapps.com
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1">
                    inbox
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1">
                    142.265.843.25{" "}
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1">
                    Pass{" "}
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1 ">
                    56
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1">
                    0
                  </Typography>
                  <Typography className="text-xl p-10 flex-1 col-span-1">
                    7 sec
                  </Typography>
                </div>
              </Paper>
            </motion.div>
          </div>
        ))}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
        initial="hidden"
        animate="show"
      >
        <div className=" sm:col-span-6 lg:col-span-6 grid-cols-4 grid">
          <div className=" flex flex-col col-span-3">
            <Typography className="username text-16 m-20 font-bold text-gray-700 whitespace-nowrap ">
              Campaign ID: {camp.id}
            </Typography>
            <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
              Subject : {camp.subject}
            </Typography>
            <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
              Last Updated : {camp.updated}
            </Typography>
            <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
              Current Status : {camp.status}
            </Typography>
          </div>
          <div className=" flex flex-row col-span-1 justify-end self-start m-20">
            <Button
              component="a"
              onClick={() => check(camp.id)}
              target="_blank"
              rel="noreferrer noopener"
              role="button"
              className="mx-5 text-sm"
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "#FFF6CF",
                color: "#000000",
              }}
              startIcon={
                <FuseSvgIcon size={16}>
                  heroicons-outline:currency-dollar
                </FuseSvgIcon>
              }
            >
              Test Campaign
            </Button>
            <Button
              component="a"
              href="/campaign-test"
              target="_blank"
              rel="noreferrer noopener"
              role="button"
              className="text-sm"
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "#FFF6CF",
                color: "#000000",
              }}
              startIcon={
                <FuseSvgIcon size={16}>
                  heroicons-outline:currency-dollar
                </FuseSvgIcon>
              }
            >
              Go Back
            </Button>
          </div>
        </div>
        <motion.div className=" sm:col-span-6  lg:col-span-6  ">
          <Paper className="flex flex-col  flex-auto justify-center shadow rounded-2xl w-full h-full overflow-hidden">
            <div className="flex justify-center">
              <Typography className="text-2xl p-10 font-bold m-16 ">
                Campaign Not Yet Tested. Click the Test Campaign button above to
                test the campaign
              </Typography>
            </div>
          </Paper>
        </motion.div>
      </motion.div>
    );
  }
}

export default DemoContent3;
