import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Feature() {
  useEffect(()=>{
    document.title = "Onboarding to Kleanify";
  })
  const auth = localStorage.getItem('user');
  const [period, setPeriod] = useState("month");
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
          >
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          >
            <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
              Content Spam and Inbox Placement Test
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
          >
           
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="flex justify-center mt-40 sm:mt-80"
          >
            <Paper className="flex flex-col lg:flex-row max-w-sm lg:max-w-xl overflow-hidden">
              <div className="p-24 sm:p-32 lg:p-40">
                <Typography
                  className="mt-8 text-xl leading-relaxed"
                  color="text.secondary"
                >
                  Kleanify scans your Klaviyo account every 15 mins to check for
                  new campaigns. If a campaign is in "scheduled" state and
                  hasn't been tested before, it is automatically tested for
                  content spam score and inbox placement test. You will get an
                  email report with the test results once the test is done.
                  <p className="pt-7">
                    Campaigns in "draft" state or "scheduled" campaigns which
                    have been tested before, won't be tested automatically to
                    save your testing credits. You can manually initiate the
                    test for such campaigns to re-test them.
                  </p>
                </Typography>
                <div className="felx  mt-24 ">
                  <Typography className="text-3xl font-bold justify-center underline">
                    <Link to="/onboarding3">Got it</Link>
                  </Typography>
                </div>
              </div>
            </Paper>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
