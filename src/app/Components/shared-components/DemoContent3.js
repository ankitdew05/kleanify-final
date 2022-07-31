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
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";

import Collapse from "@mui/material/Collapse";

import { lighten, useTheme } from "@mui/material/styles";
import Section from "./Section";
import DemoHeader from "./DemoHeader";

function DemoContent3() {
  const theme = useTheme();
  const params = useParams();
  const auth = localStorage.getItem("user");
  const [newsub, setnewsub] = useState("0");
  const [nocheck, setnocheck] = useState("0");
  const [noemails, setnoemails] = useState("0");
  const [emailarray, setemailarray] = useState([""]);
  const [data, setData] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  useEffect(() => {
    getBounce();
    getResult();
    getEmailInfo();
  }, []);
  console.log(data)
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

  const getResult = async () => {
    axios
      .get(
        `https://spamtest.glockapps.com/api/v1/GetTestResult?apikey=247a02215ab683f39f51b14647c4a144a6e7720d&TestID=${params.id}`
      )
      .then((response) => {
        setData(response.data);
        console.log("Result Data", response.data.Stats);
      })
      .catch((err) => console.error(err));
  };
  const getEmailInfo = async () => {
    axios
      .get(
        `https://spamtest.glockapps.com/api/v1/GetEmailInfo?apikey=247a02215ab683f39f51b14647c4a144a6e7720d&TestID=${params.id}`
      )
      .then((response) => {
        console.log("Email Info Data", response.data);
      })
      .catch((err) => console.error(err));
  };

  const getBounce = async () => {
    await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`)
      .then((response) => {
        if (response.data[0].emailId) {
          axios
            .get(`${baseURL}/email/${response.data[0].emailId}`)
            .then((response) => {
              const arr = response.data.array;
              let count = arr.length;
              console.log(response.data);
              setnewsub(response.data.newSubscriber);
              setnocheck(response.data.newSubscriberChecked);
              setemailarray(response.data.array);
              setnoemails(count);
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
      initial="hidden"
      animate="show"
    >
      <div className=" sm:col-span-6 lg:col-span-6 grid-cols-4 grid">
        <div className=" flex flex-col col-span-3">
          <Typography className="username text-16 m-20 font-bold text-gray-700 whitespace-nowrap ">
            Campaign ID: ADFSS
          </Typography>
          <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
            Subject : Goog Bye
          </Typography>
          <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
            Last Updated : 20 June 2017
          </Typography>
          <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
            Current Status : Draft
          </Typography>
        </div>

        <div className=" flex flex-row col-span-1 justify-end self-start m-20">
          <Button
            component="a"
            href="/pricing"
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
            Test Results
          </Button>
          <Button
            component="a"
            href="/pricing"
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

      <div className="sm:col-span-6 lg:col-span-6 grid grid-cols-1 md:grid-cols-4 md:gap-x-24 gap-y-24 ">
        <div className=" sm:col-span-6 lg:col-span-6 grid-cols-4 grid">
          <div className=" flex flex-col col-span-3">
          <Typography className="username text-24 m-20 mt-0 font-bold text-gray-700 whitespace-nowrap ">
              Test Results
            </Typography>
            <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
              Tested On : 27 June 2022
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
              68.2%
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
                3.6%
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
                27.59%
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
                2%
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
        Sender IP 167.89.29.98 Reputation
      </Typography>

      <div className="sm:col-span-6 lg:col-span-6 grid  ">
        <div className="flex flex-col bg-green-200 p-24 w-full sm:py-32 sm:px-40">
          <div className="flex justify-between">
            <Typography className="username text-24 text-white whitespace-nowrap font-medium">
              Senders Authentication
            </Typography>
            <div className="flex">
              <Typography className="username text-15 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                DKIM: pass
              </Typography>
              <Typography className="username text-15 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                SPF: pass
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
                  Sender Scores range from 0 to 100. Any Sender Score below 100
                  means your sender reputation can be improved.
                </Typography>
                <Typography className="text-xl pl-10 ">
                  You should use your Sender Score along with other spam filter
                  diagnostics to help guide your email strategy to a place that
                  makes your email subscribers happy and engaged.{" "}
                </Typography>
                <Typography className="text-xl p-10 ">
                  Email senders with a Sender Score below 70 typically
                  experience aggressive email filtering applied to every email
                  coming from the IP address attached to the Sender Score. Email
                  senders maintaining a Sender Score above 70 typically see
                  filtering criteria applied to individual emails and email
                  campaigns instead of entire IP addresses.{" "}
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
                56
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
                  Sender Scores range from 0 to 100. Any Sender Score below 100
                  means your sender reputation can be improved.
                </Typography>
                <Typography className="text-xl pl-10 ">
                  You should use your Sender Score along with other spam filter
                  diagnostics to help guide your email strategy to a place that
                  makes your email subscribers happy and engaged.{" "}
                </Typography>
                <Typography className="text-xl p-10 ">
                  Email senders with a Sender Score below 70 typically
                  experience aggressive email filtering applied to every email
                  coming from the IP address attached to the Sender Score. Email
                  senders maintaining a Sender Score above 70 typically see
                  filtering criteria applied to individual emails and email
                  campaigns instead of entire IP addresses.{" "}
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
                  Your server's IP address (167.89.29.98) is not found in any of
                  50+ blacklists where GlockApps does an IP check.{" "}
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
                SPAM
              </Typography>
              <Typography className="username text-16 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                Not PHISHY
              </Typography>
              <FuseSvgIcon
                size={24}
                className=" text-white mt-3"
                
              >
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
                Score: 0
              </Typography>
              <FuseSvgIcon
                size={24}
                className=" text-white mt-3"
               
              >
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
                Score: 6.6
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
                  The famous spam filter SpamAssassin. Score: 6.6. A score above
                  5 is considered spam. You need to fix "red" and "yellow"
                  points to improve your deliverability.{" "}
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

      {/* <motion.div className="sm:col-span-6">
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
            <div className="flex flex-col">
              <Typography className="font-medium" color="text.secondary">
                Overview
              </Typography>
              <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
                <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
                  <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                    12
                  </Typography>
                  <Typography className="mt-4 text-sm sm:text-lg font-medium">
                    New Issues
                  </Typography>
                </div>
                <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800">
                  <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                    123
                  </Typography>
                  <Typography className="mt-4 text-sm sm:text-lg font-medium">
                    Closed
                  </Typography>
                </div>
                <Box
                  sx={{
                    backgroundColor: (_theme) =>
                      _theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                >
                  <Typography className="text-5xl font-semibold leading-none tracking-tight">
                    hfh
                  </Typography>
                  <Typography className="mt-4 text-sm font-medium text-center">
                    Fixed
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: (_theme) =>
                      _theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                >
                  <Typography className="text-5xl font-semibold leading-none tracking-tight">
                    hgh
                  </Typography>
                  <Typography className="mt-4 text-sm font-medium text-center">
                    Won't Fix
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: (_theme) =>
                      _theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                >
                  <Typography className="text-5xl font-semibold leading-none tracking-tight">
                    hghg
                  </Typography>
                  <Typography className="mt-4 text-sm font-medium text-center">
                    Re-opened
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: (_theme) =>
                      _theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                >
                  <Typography className="text-5xl font-semibold leading-none tracking-tight">
                    ghmh
                  </Typography>
                  <Typography className="mt-4 text-sm font-medium text-center">
                    Needs Triage
                  </Typography>
                </Box>
              </div>
            </div>
            <div className="flex flex-col">
              <Typography className="font-medium" color="text.secondary">
                Overview
              </Typography>
              <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
                <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
                  <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                    12
                  </Typography>
                  <Typography className="mt-4 text-sm sm:text-lg font-medium">
                    New Issues
                  </Typography>
                </div>
                <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800">
                  <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                    123
                  </Typography>
                  <Typography className="mt-4 text-sm sm:text-lg font-medium">
                    Closed
                  </Typography>
                </div>
                <Box
                  sx={{
                    backgroundColor: (_theme) =>
                      _theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                >
                  <Typography className="text-5xl font-semibold leading-none tracking-tight">
                    hfh
                  </Typography>
                  <Typography className="mt-4 text-sm font-medium text-center">
                    Fixed
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: (_theme) =>
                      _theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                >
                  <Typography className="text-5xl font-semibold leading-none tracking-tight">
                    hgh
                  </Typography>
                  <Typography className="mt-4 text-sm font-medium text-center">
                    Won't Fix
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: (_theme) =>
                      _theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                >
                  <Typography className="text-5xl font-semibold leading-none tracking-tight">
                    hghg
                  </Typography>
                  <Typography className="mt-4 text-sm font-medium text-center">
                    Re-opened
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: (_theme) =>
                      _theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                >
                  <Typography className="text-5xl font-semibold leading-none tracking-tight">
                    ghmh
                  </Typography>
                  <Typography className="mt-4 text-sm font-medium text-center">
                    Needs Triage
                  </Typography>
                </Box>
              </div>
            </div>
          </div>
        </Paper>
      </motion.div> */}

      {/*   <motion.div variants={item} className="widget flex w-full sm:w-1/2 p-12">
        <Widget8 widget={widgets.widget8} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 p-12">
        <Widget9 widget={widgets.widget9} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full p-12">
        <Widget10 widget={widgets.widget10} />
      </motion.div> */}
    </motion.div>
  );
}

export default DemoContent3;
