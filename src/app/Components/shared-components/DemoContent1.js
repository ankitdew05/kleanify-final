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

function DemoContent1() {
  const auth = localStorage.getItem("user");
  const [newsub, setnewsub] = useState("0");
  const [nocheck, setnocheck] = useState("0");
  const [noemails, setnoemails] = useState("0");
  const [emailarray, setemailarray] = useState([""]);

  useEffect(() => {
    getBounce();
    getData()
  }, []);

  const getBounce = async () => {
    await axios
      .get(`${baseURL}/email/${JSON.parse(auth)._id}`)
      .then((response) => {
        console.log(response.data);
        setemailarray(response.data);
      })
      .catch((err) => console.error(err));
  };

  async function getData() {
     await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`)
      .then((response) => {
        console.log(response.data[0].newSubscriber)
        setnewsub(response.data[0].newSubscriber)
        setnocheck(response.data[0].newSubscriber)
        setnoemails(response.data[0].emailValidation)
      })
      .catch((err) => console.error(err));
  
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
      initial="hidden"
      animate="show"
    >
      <div className="sm:col-span-6 lg:col-span-6 grid grid-cols-1 md:grid-cols-3 md:gap-x-24 gap-y-24 ">
        <motion.div className="sm:col-span-1">
          <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
            <div className="flex items-center justify-between px-8 pt-12"></div>
            <div className="text-center mt-8 p-28">
              <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-green-500">
                New Subscriber
              </Typography>

              <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-green-500">
                {newsub}
              </Typography>
              {/* <Typography className="text-lg font-medium text-green-600">
                Invalid Email Supressed
              </Typography> */}
            </div>
             <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
              <Typography
                className="px-16 text-xl font-medium tracking-tight leading-6 "
                color="text.secondary"
              >
                Last 30 Days
              </Typography>
            </div> 
          </Paper>
        </motion.div>
        <motion.div className="sm:col-span-1">
          <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
            <div className="flex items-center justify-between px-8 pt-12"></div>
            <div className="text-center mt-8 p-28">
              <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-amber-500">
                Email Checks
              </Typography>

              <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-amber-500">
                {nocheck}
              </Typography>
              {/* <Typography className="text-lg font-medium text-amber-600">
                Tests Done
              </Typography> */}
            </div>
            <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
              <Typography
                className="px-16 text-xl font-medium tracking-tight leading-6 "
                color="text.secondary"
              >
                Last 30 Days
              </Typography>
            </div> 
          </Paper>
        </motion.div>
        <motion.div className="sm:col-span-1">
          <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
            <div className="flex items-center justify-between px-8 pt-12"></div>
            <div className="text-center mt-8 p-28">
              <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-blue-500">
                Invalid Emails
              </Typography>

              <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-blue-500">
                {noemails}
              </Typography>
              {/* <Typography className="text-lg font-medium text-blue-600">
                Unengaged Subscribers Cleaned
              </Typography> */}
            </div>
            <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
              <Typography
                className="px-16 text-xl font-medium tracking-tight leading-6 "
                color="text.secondary"
              >
                Last 30 Days
              </Typography>
            </div> 
          </Paper>
        </motion.div>
      </div>

      <motion.div className="sm:col-span-6">
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
          <Typography className="text-3xl font-medium tracking-tight leading-6 ">
            Invalid Emails
          </Typography>
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
                      Reason
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emailarray.map((value, index) => (
                  <>
                    {(value.array || []).map((valueEmail) => {
                      return (
                        <TableRow>
                        <>
                          <TableCell component="th" scope="row">
                            <Typography className="">{valueEmail.email}</Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography className="">{valueEmail.reason}</Typography>
                          </TableCell>
                        </>
                        </TableRow>
                      );
                    })}
                  </>
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
}

export default DemoContent1;
