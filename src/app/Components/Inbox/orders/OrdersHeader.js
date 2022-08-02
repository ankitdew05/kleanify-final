import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import axios from "axios";
import {
  selectOrdersSearchText,
  setOrdersSearchText,
} from "../store/ordersSlice";
import { useEffect, useState } from "react";
import baseURL from "src/app/common/baseURL";

function OrdersHeader(props) {
  const auth = localStorage.getItem("user");
  const dispatch = useDispatch();
  const searchText = useSelector(selectOrdersSearchText);
  const [data , setData] = useState('')

  useEffect(()=>{
    getData();
  }, [])
  const handleChange = async () => {
   await onchange(!data.campaignAutoTest);
   window.location.reload()
  };

  const getCamp = async () => {
    console.log(JSON.parse(auth).apiKey)
    axios
      .get(`${baseURL}/campaign/${JSON.parse(auth).apiKey}/${JSON.parse(auth)._id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  };

  async function onchange(state) {
    const userId = JSON.parse(auth)._id
    let result = await fetch(`${baseURL}/changeCampaignAutoTest`, {
      method: "put",
      body: JSON.stringify({ userId, state }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.warn(result);
  }

  async function getData() {
    await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`)
      .then((response) => {
        setData(response.data[0])
      })
      .catch((err) => console.error(err));
  }


  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="flex text-15 md:text-20 font-extrabold tracking-tight"
      >
        Test Queued Campaigns Automatically (only if not tested alredy)
      </Typography>

      <div class="flex justify-center ml-10">
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={data.campaignAutoTest} onChange={handleChange} />}
            inputProps={{ "aria-label": "controlled" }}
          />
        </FormGroup>
      </div>

      <div className="flex flex-1 items-center justify-end space-x-8 w-full sm:w-auto">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
         

          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search Subjects"
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              "aria-label": "Search Orders",
            }}
            onChange={(ev) => dispatch(setOrdersSearchText(ev))}
          />
        </Paper>
      </div>
    </div>
  );
}

export default OrdersHeader;
