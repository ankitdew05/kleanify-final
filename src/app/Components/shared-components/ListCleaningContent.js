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
import baseURL from "src/app/common/baseURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import FuseLoading from "@fuse/core/FuseLoading";


function ListCleaningContent() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [newsub, setnewsub] = useState("0");
  const [nocheck, setnocheck] = useState("0");
  const [noemails, setnoemails] = useState("0");
  const [emailarray, setemailarray] = useState([""]);
  const [ListCleaned, setListCleaned] = useState("");
  const [unengaged, setUnengaged] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setstatus] = useState(false);
  const [count , setCount] = useState("")
  useEffect(() => {
    getUnengagedCount()
    getData()
      .then((res) => {
        console.log(res);
        setListCleaned(res[0].listCleaning);
        if (res[0].segmentId) {
          console.log("this is segment id", res[0].segmentId);
          navigate(`/list-cleaning`);
        } else {
          console.log("On boarding");
          navigate("/onboarding3");
        }
      })
      .catch((err) => console.log(err));
    getData1()
      .then((res) => {
        console.log("Response", res.length);
        if (res.length > 0) {
          setstatus(!status);
          setLoading(false)
          getUnengaged()
            .then((res) => {
              const numAscending = res.sort(function(a, b) {
                return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
            });
              setUnengaged(numAscending);
              console.log("Data", res, numAscending);
            })
            .catch((err) => console.log(err));
        } else {
          setstatus(status);
          setLoading(false)
          // navigate("/empty-list-cleaning");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  async function getData() {
    const data = await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`, 
      {headers: { "authorization": JSON.parse(token) }})
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
    return data;
  }

  async function getData1() {
    const data = await axios
      .get(`${baseURL}/unengaged/${JSON.parse(auth)._id}`,
      {headers: { "authorization": JSON.parse(token) }})
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
    return data;
  }

  async function getUnengaged() {
    const data = await axios
      .get(`${baseURL}/unengaged30/${JSON.parse(auth)._id}`,
      {headers: { "authorization": JSON.parse(token) }})
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => console.error(err));
    return data;
  }

  const getUnengagedCount = async () => {
    console.log(JSON.parse(token))
    await axios
      .get(`${baseURL}/unengaged30/${JSON.parse(auth)._id}`, {
        headers: { "authorization": JSON.parse(token) }
      })
      .then((response) => {
        const array = response.data
        console.log("Hi",array);
        let sum = 0
        array.map((value)=>{
          sum = sum + value.creditUsed
        })
        setCount(sum)
      })
      .catch((err) => console.error(err));
  };

  // function putComma(arr) {

  //   const result1 = Object.assign({}, arr);
  //   var result = Object.keys(result1).map((key) => [ [[result1[key]]]])
  //   return [result];
  // }

  // function csv(rows) {
  //   let csvContent =
  //   "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

  // var encodedUri = encodeURI(csvContent);
  // window.open(encodedUri);
  // }



  if (loading) {
    return (
      <div className="flex w-full items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (status) {
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
        initial="hidden"
        animate="show"
      >
        <motion.div className="sm:col-span-6">
          <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden ">
            <Typography className="text-3xl p-24 font-medium tracking-tight leading-6 ">
              <b>{count} </b>Unengaged Subscribers Cleaned in last 30 days
            </Typography>
            <div className="table-responsive">
              <Table className="w-full min-w-full">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        color="text.secondary"
                        className="font-semibold text-18 whitespace-nowrap"
                      >
                        Date
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        color="text.secondary"
                        className="font-semibold text-18 whitespace-nowrap"
                      >
                        No. of Unengaged Subscriber
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        color="text.secondary"
                        className="font-semibold text-18 whitespace-nowrap"
                      >
                        Download List 
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unengaged.map((value) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Typography className="">
                          {new Date(value.date).toLocaleDateString(
                            "locale",

                            {
                              dateStyle: "full",
                            }
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="">{value.creditUsed}</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="underline">
                          <CSVLink
                            columns="Emails"
                            target="_blank"
                            filename={`kleanify-uneng-subs-${value.date}.csv`}
                            data={[value.array]}
                          >
                            Download List
                          </CSVLink>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </motion.div>

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
  } else {
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
        initial="hidden"
        animate="show"
      >
        <motion.div className="sm:col-span-6">
          <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
            <Typography className="text-3xl p-24 font-medium tracking-tight leading-6 ">
              Cleaning in progress. Please check back later. You will also
              receive an email once the cleaning is done
            </Typography>
          </Paper>
        </motion.div>
      </motion.div>
    );
  }
}

export default ListCleaningContent;
