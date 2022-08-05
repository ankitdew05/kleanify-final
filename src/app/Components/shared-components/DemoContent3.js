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
  const [result, setResult] = useState("Test Campaign");
  useEffect(() => {
    //getBounce();
    //getEmailInfo();
    getData()
      .then((response) => {
        if (response.checked.length !== 0) {
          setstatus(true);
          setResult("Test Again");
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
  const check = async (id, campaignId) => {
    setSpinner(true);
    let result = await fetch(
      `${baseURL}/campaignTest/${JSON.parse(auth).apiKey}/${id}/${
        JSON.parse(auth)._id
      }/${campaignId}`,
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
    if (result.Status === "Success") {
      alert(`Succesfully Tested Camapign ${result.CamapignId}`);
    } else {
      alert(
        ` Oops! Eroor Not Able To Test Tested Camapign ${result.CamapignId} , Try Agin Later`
      );
    }
    window.location.reload();
  };

  if (status) {
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
        initial="hidden"
        animate="show"
      >
      
        <div className=" sm:col-span-6 lg:col-span-6 col-span-1 grid-cols-4 grid">
          <div className=" flex flex-col sm:col-span-3 ">
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

          <div className=" flex flex-row  col-span-1 justify-end self-start sm:m-20">
            <div className="flex-1">
              <Button
                component="a"
                onClick={() => check(camp.id, camp._id)}
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
                {result}
              </Button>
            </div>
            <div className="flex-1">
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
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
        {checked.map((value, index) => (
          <div className="sm:col-span-6  lg:col-span-6 grid grid-cols-1 md:grid-cols-4 md:gap-x-24 gap-y-24">
            <div>
              <div className=" sm:col-span-6 lg:col-span-6 grid-cols-4 grid">
                <div className=" flex flex-col col-span-3">
                  <Typography
                    onClick={handleClick6}
                    className="username text-24 m-20 mt-0 font-bold text-gray-700 whitespace-nowrap "
                  >
                    Test Results {index + 1}
                  </Typography>
                  <Typography className="username text-16 m-20 mt-0 text-gray-700 whitespace-nowrap ">
                    Tested On :{" "}
                    {new Date(value.date).toLocaleDateString(
                      "locale",

                      {
                        dateStyle: "full",
                      }
                    )}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="sm:col-span-6 lg:col-span-6 flex flex-col md:grid md:grid-cols-4 md:gap-x-24 gap-y-24 ">
              <div className="sm:col-span-6 lg:col-span-6 flex flex-col md:grid md:grid-cols-4 md:gap-x-24 gap-y-24 ">
                <motion.div className="sm:col-span-1">
                  <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
                    <div className="flex items-center justify-between px-8 pt-12"></div>
                    <div className="text-center mt-8 p-28">
                      <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-green-500">
                        Inbox Rate
                      </Typography>
                      <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-green-500">
                        {value.Result?.Stats.InboxRate}
                      </Typography>
                    </div>
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
                        {value.Result?.Stats.BounceRate}
                      </Typography>
                    </div>
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
                        {value.Result?.Stats.SpamRate}
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
                        {value.Result?.Stats.SpamRate}
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
                Sender IP {value.Result?.SenderIP} Reputation
              </Typography>

              <div className="sm:col-span-6 lg:col-span-6 grid  ">
                <div className="flex flex-col bg-green-200 p-24 w-full sm:py-16 sm:px-40">
                  <div className="flex justify-between">
                    <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                      Senders Authentication
                    </Typography>
                    <div className="flex">
                      <Typography className="username text-15 py-6 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                        DKIM: {value.Result?.DKIM}
                      </Typography>
                      <Typography className="username text-15 py-6  px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                        SPF: {value.Result?.SPF}
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
                          below 100 means your sender reputation can be
                          improved.
                        </Typography>
                        <Typography className="text-xl pl-10 ">
                          You should use your Sender Score along with other spam
                          filter diagnostics to help guide your email strategy
                          to a place that makes your email subscribers happy and
                          engaged.{" "}
                        </Typography>
                        <Typography className="text-xl p-10 ">
                          Email senders with a Sender Score below 70 typically
                          experience aggressive email filtering applied to every
                          email coming from the IP address attached to the
                          Sender Score. Email senders maintaining a Sender Score
                          above 70 typically see filtering criteria applied to
                          individual emails and email campaigns instead of
                          entire IP addresses.{" "}
                        </Typography>
                      </div>
                    </Paper>
                  </motion.div>
                </Collapse>
              </div>

              <div className="sm:col-span-6 lg:col-span-6 grid  ">
                <div className="flex flex-col bg-red-200 p-24 w-full sm:py-16 sm:px-40">
                  <div className="flex justify-between">
                    <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                      Sender Score
                    </Typography>
                    <div className="flex">
                      <Typography className="username text-16 py-6 px-10 mr-10 bg-red-400 rounded-4 text-white whitespace-nowrap font-medium">
                        {value.Result?.SenderScore}
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
                          below 100 means your sender reputation can be
                          improved.
                        </Typography>
                        <Typography className="text-xl pl-10 ">
                          You should use your Sender Score along with other spam
                          filter diagnostics to help guide your email strategy
                          to a place that makes your email subscribers happy and
                          engaged.{" "}
                        </Typography>
                        <Typography className="text-xl p-10 ">
                          Email senders with a Sender Score below 70 typically
                          experience aggressive email filtering applied to every
                          email coming from the IP address attached to the
                          Sender Score. Email senders maintaining a Sender Score
                          above 70 typically see filtering criteria applied to
                          individual emails and email campaigns instead of
                          entire IP addresses.{" "}
                        </Typography>
                      </div>
                    </Paper>
                  </motion.div>
                </Collapse>
              </div>

              <div className="sm:col-span-6 lg:col-span-6 grid  ">
                <div className="flex flex-col bg-green-200 p-24 w-full sm:py-16 sm:px-40">
                  <div className="flex justify-between">
                    <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                      IP Black Lists
                    </Typography>
                    <div className="flex">
                      <Typography className="username text-16 pt-6 px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
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
                          Your server's IP address {value.Result?.SenderIP} is
                          not found in any of 50+ blacklists where GlockApps
                          does an IP check.{" "}
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
                <div className="flex flex-col bg-green-200 p-24 w-full sm:py-16 sm:px-40">
                  <div className="flex justify-between">
                    <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                      Google Spam Filter
                    </Typography>
                    <div className="flex">
                      <Typography className="username text-16 pt-6 px-10 mr-10 bg-red-500 rounded-4 text-white whitespace-nowrap font-medium">
                        SPAM :{value.Result?.GoogleApps.Spam}
                      </Typography>
                      <Typography className="username text-16 px-10 pt-6  mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                        PHISHY: {value.Result?.GoogleApps.Phishy}
                      </Typography>
                      {/* <FuseSvgIcon size={24} className=" text-white mt-3">
                      heroicons-outline:chevron-down
                    </FuseSvgIcon> */}
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
                <div className="flex flex-col bg-green-200 p-24 w-full sm:py-16 sm:px-40">
                  <div className="flex justify-between">
                    <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                      Barracuda Test.
                    </Typography>
                    <div className="flex">
                      <Typography className="username text-16 pt-6  px-10 mr-10 bg-green-500 rounded-4 text-white whitespace-nowrap font-medium">
                        Score: {value.Result.Barracuda.Score}
                      </Typography>
                      <FuseSvgIcon
                        size={24}
                        className=" text-white mt-3"
                        onClick={handleClick5}
                      >
                        heroicons-outline:chevron-down
                      </FuseSvgIcon>
                    </div>
                  </div>
                </div>
                <Collapse in={open5}>
                  <motion.div className="sm:col-span-1">
                    <Paper className="flex flex-col flex-auto justify-center shadow rounded-2xl w-full h-full overflow-hidden">
                      <div className="text-left mt-8 p-28">
                        <Typography className="text-xl p-10 ">
                          Barracuda is an expensive corporate hardware spam
                          filter that is installed by large organizations within
                          their own datacenters.
                        </Typography>{" "}
                      </div>
                      {/* {(value.Result?.Barracuda.Headers || []).map((data) => (
                      <div className="flex  px-8 pt-12 m-16 ">
                        <div className=" flex-1">
                          <Typography className="username w-fit text-16 px-10 mr-10  bg-red-500 rounded-4 text-white  font-medium">
                            Score: {data.Score}
                          </Typography>
                        </div>

                        <Typography className="text-xl p-10 flex-1 ">
                          {data.Tag}
                        </Typography>
                        <Typography className="text-xl p-10 flex-2 ">
                          {data.Description}
                        </Typography>
                      </div>
                    ))} */}
                      <motion.div className="sm:col-span-6">
                        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                          <div className="table-responsive">
                            <Table className="w-full min-w-full">
                              <TableBody>
                                {(value.Result?.Barracuda.Headers || []).map(
                                  (data) => (
                                    <TableRow>
                                      <>
                                        <TableCell component="th" scope="row">
                                          <Typography className="username w-fit text-16 px-10 mr-10  bg-red-500 rounded-4 text-white  font-medium">
                                            Score: {data.Score}
                                          </Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          <Typography className="text-xl p-10 flex-1 ">
                                            {data.Tag}
                                          </Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          <Typography className="text-xl p-10 flex-2 ">
                                            {data.Description}
                                          </Typography>
                                        </TableCell>
                                      </>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </motion.div>
                    </Paper>
                  </motion.div>
                </Collapse>
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
                <div className="flex flex-col bg-red-200 p-24 w-full sm:py-16 sm:px-40">
                  <div className="flex justify-between">
                    <Typography className="username text-24 text-white whitespace-nowrap font-medium">
                      SpamAssassin Test.
                    </Typography>
                    <div className="flex">
                      <Typography className="username text-16 pt-6  px-10 mr-10 bg-red-500 rounded-4 text-white whitespace-nowrap font-medium">
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
                          The famous spam filter SpamAssassin. Score:{" "}
                          {value.Result.SpamAssassin.Score}. A score above 5 is
                          considered spam. You need to fix "red" and "yellow"
                          points to improve your deliverability.{" "}
                        </Typography>{" "}
                      </div>
                      {/* {(value.Result.SpamAssassin.Headers || []).map((data) => (
                      <div className="flex  px-8 pt-12 m-16 ">
                        <div className=" flex-1">
                          <Typography className="username w-fit text-16 px-10 mr-10  bg-red-500 rounded-4 text-white  font-medium">
                            Score: {data.Score}
                          </Typography>
                        </div>

                        <Typography className="text-xl p-10 flex-1 ">
                          {data.Tag}
                        </Typography>
                        <Typography className="text-xl p-10 flex-2 ">
                          {data.Description}
                        </Typography>
                      </div>
                    ))} */}
                      <motion.div className="sm:col-span-6">
                        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                          <div className="table-responsive">
                            <Table className="w-full min-w-full">
                              <TableBody>
                                {(value.Result.SpamAssassin.Headers || []).map(
                                  (data) => (
                                    <TableRow>
                                      <>
                                        <TableCell component="th" scope="row">
                                          <Typography className="username w-fit text-16 px-10 mr-10  bg-red-500 rounded-4 text-white  font-medium">
                                            Score: {data.Score}
                                          </Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          <Typography className="text-xl p-10 flex-1 ">
                                            {data.Tag}
                                          </Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          <Typography className="text-xl p-10 flex-2 ">
                                            {data.Description}
                                          </Typography>
                                        </TableCell>
                                      </>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </Paper>
                      </motion.div>
                    </Paper>
                  </motion.div>
                </Collapse>
              </div>

              <Typography className="username text-24 m-20 text-gray-700 whitespace-nowrap ">
                Email Providers Delivery Report
              </Typography>
              {(value.Result.Inboxes || []).map((data) => (
                <motion.div className="sm:col-span-6">
                  <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                    <div className="flex justify-start">
                      <Typography className="text-xl p-10  m-16 ">
                        {data.ISP}
                      </Typography>
                    </div>
                    <div className="table-responsive">
                      <Table className="w-full min-w-full">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography
                                color="text.secondary"
                                className="font-semibold text-12 whitespace-nowrap"
                              >
                                Email
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography
                                color="text.secondary"
                                className="font-semibold text-12 whitespace-nowrap"
                              >
                                Deleiver To
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography
                                color="text.secondary"
                                className="font-semibold text-12 whitespace-nowrap"
                              >
                                Sender Ip
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                color="text.secondary"
                                className="font-semibold text-12 whitespace-nowrap"
                              >
                                SPF
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                color="text.secondary"
                                className="font-semibold text-12 whitespace-nowrap"
                              >
                                Sender Score
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                color="text.secondary"
                                className="font-semibold text-12 whitespace-nowrap"
                              >
                                Black List
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                color="text.secondary"
                                className="font-semibold text-12 whitespace-nowrap"
                              >
                                Delivered in
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <>
                              <TableCell component="th" scope="row">
                                <Typography className="text-xl  flex-1 col-span-2">
                                  {data.email}
                                </Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {data.iType === "Inbox" ? (
                                  <Typography className="text-xl  bg-green-500 w-fit rounded-8 p-5 text-white flex-1 ">{data.iType}</Typography>
                                ) : (
                                  <Typography className="text-xl bg-red-500 rounded-8 w-fit p-5 text-white flex-1 ">{data.iType}</Typography>
                                ) }
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <Typography className="text-xl  flex-2 ">
                                  {data.ip}
                                </Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <Typography className="text-xl  flex-2 ">
                                {data.iType === "Pass" ? (
                                  <Typography className="text-xl  bg-green-500 w-fit rounded-8 p-5 text-white flex-1 ">{data.spf}</Typography>
                                ) : (
                                  <Typography className="text-xl bg-red-500 rounded-8 w-fit p-5 text-white flex-1 ">{data.spf}</Typography>
                                ) }
                                  
                                </Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <Typography className="text-xl  flex-2 ">
                                  {data.ss}
                                </Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <Typography className="text-xl  flex-2 ">
                                {data.iType === "0" ? (
                                  <Typography className="text-xl  bg-green-500 w-fit rounded-8 p-10 text-white flex-1 ">{data.bl}</Typography>
                                ) : (
                                  <Typography className="text-xl bg-red-500 rounded-8 w-fit p-10 text-white flex-1 ">{data.bl}</Typography>
                                ) }
                                </Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <Typography className="text-xl  flex-2 ">
                                  {data.Delay}
                                </Typography>
                              </TableCell>
                            </>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </motion.div>
              ))}
              {/* {(value.Result.Inboxes || []).map((data) => (
              <motion.div className=" sm:col-span-6 lg:col-span-6  ">
                <Paper className="flex flex-col flex-auto justify-center shadow rounded-2xl w-full h-full overflow-hidden">
                  <div className="flex justify-start">
                    <Typography className="text-xl p-10  m-16 ">
                      {data.ISP}
                    </Typography>
                    <div className=" flex-1 p-10 m-16">
                      <Typography className="username w-fit text-16 px-10 mr-10  bg-green-500 rounded-4 text-white  font-medium">
                        Inbox: 100%
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
                      {data.email}
                    </Typography>
                    <Typography className="text-xl p-10 flex-1 col-span-1">
                      {data.iType}
                    </Typography>
                    <Typography className="text-xl p-10 flex-1 col-span-1">
                      {data.ip}
                    </Typography>
                    <Typography className="text-xl p-10 flex-1 col-span-1">
                      {data.spf}
                    </Typography>
                    <Typography className="text-xl p-10 flex-1 col-span-1 ">
                      {data.ss}
                    </Typography>
                    <Typography className="text-xl p-10 flex-1 col-span-1">
                      {data.bl}
                    </Typography>
                    <Typography className="text-xl p-10 flex-1 col-span-1">
                      {data.Delay}
                    </Typography>
                  </div>
                </Paper>
              </motion.div>
            ))} */}
            </div>
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
              onClick={() => check(camp.id, camp._id)}
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
