import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../common/baseURL";

function Feature1() {
  const [period, setPeriod] = useState("month");
  const params = useParams();
  const id = params.id;
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Onboarding to Kleanify";
    const data = getData()
      .then((res) => {
        console.log(res);
        if (res[0].segmentId) {
          navigate(`/`);
        }
      })
      .catch((err) => console.log(err));
    console.log("data", data);
  }, []);

  async function getData() {
    const data = await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
    return data;
  }
  return (
    <div className="relative bg-[#FFF6CF] opacity-90  flex flex-col flex-auto min-w-0 overflow-hidden">
      <div className="relative pt-32 pb-48 sm:pt-80 sm:pb-96 px-24 sm:px-64 overflow-hidden">
        <svg
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
        </svg>
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
              Automated Email Validation
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
            <Paper className="flex flex-col  lg:flex-row max-w-sm lg:max-w-xl overflow-hidden">
              <div className="p-24 sm:p-32 lg:p-40">
                <Typography
                  className="mt-8 text-xl leading-relaxed"
                  color="text.secondary"
                >
                  Kleanify scans your Klaviyo account every 15 mins to check for
                  new subscribers & automatically validates the emails. If
                  emails are found to be invalid, it automatically suppresses
                  these emails in your account.
                </Typography>
                <div className="felx  w-1/3  mt-24 ">
                  <Link to="/onboarding2">
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
                    >
                      Understood
                    </Button>
                  </Link>
                </div>
              </div>
            </Paper>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Feature1;
