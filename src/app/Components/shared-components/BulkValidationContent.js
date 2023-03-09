import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import baseURL from "src/app/common/baseURL";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import FuseLoading from "@fuse/core/FuseLoading";

function BulkValidationContent() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [unengaged, setUnengaged] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setstatus] = useState(false);
  const [count, setCount] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/checkbulkvalidation/${JSON.parse(auth)._id}`);
        if (response.data.status) {
          console.log(response.data.status);
        } else {
          navigate("/selectbulk");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    const fetchData1 = async () => {
      try {
        const response = await axios.get(`${baseURL}/bulkemailValidationTesting30/${JSON.parse(auth)._id}`);
        console.log(response)
        if (response.data.Array.length > 0) {
          console.log(response.data.Array.length);
          setUnengaged(response.data.Array)
          setstatus(!status);
          setLoading(false);
        } else {
          setstatus(status);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData1();
    getUnengagedCount();
  }, []);


  const getUnengagedCount = async () => {
    try {
      const response = await axios.get(`${baseURL}/bulkemailValidationTesting30/${JSON.parse(auth)._id}`);
      console.log(response)
      if (response.data.Array.length > 0) {
        const array = response.data.Array;
        console.log("Hi", array);
        let sum = 0;
        array.map((value) => {
          sum = sum + value.validemails;
        });
        setCount(sum);
      } else {
        setCount(0);
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

  if (status) {
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
        initial="hidden"
        animate="show"
      >
        <motion.div className="sm:col-span-6">
          <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden ">
            <div className="flex justify-between">
              <Typography className="text-3xl p-24 font-medium tracking-tight leading-6 ">
                <b>{count} </b>Invalid Emails Cleaned in last 30 days
              </Typography>
              <Link to='/selectbulk'>
                <Typography className="text-3xl p-24 font-100 tracking-tight leading-6 ">
                  <button
                    className="bg-green p-8 text-lg text-white rounded-12"
                  // onClick={() => handleCheckout()}
                  >
                    Start New Email Validation
                  </button>
                </Typography>
              </Link>

            </div>

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
                        List Size
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="text.secondary"
                        className="font-semibold text-18 whitespace-nowrap"
                      >
                        Invalid Emails
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
                        <Typography className="">{value.totalemails}</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="">{value.validemails}</Typography>
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
              Bulk Email validation started. You will get an email alert once it’s completed.
            </Typography>
          </Paper>
        </motion.div>
      </motion.div>
    );
  }
}

export default BulkValidationContent;
