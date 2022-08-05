import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseUtils from "@fuse/utils";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import { lighten, useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import {
  getOrders,
  selectOrders,
  selectOrdersSearchText,
} from "../store/ordersSlice";
import { useNavigate } from "react-router-dom";
import OrdersTableHead from "./OrdersTableHead";
import baseURL from "src/app/common/baseURL";
import axios from "axios";
import { Button } from "@mui/material";

function OrdersTable(props) {
  const theme = useTheme()
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const searchText = useSelector(selectOrdersSearchText);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(orders);
  const [data1, setData1] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const auth = localStorage.getItem("user");

  useEffect(() => {
    document.title = "Campaign-Kleanify";
    dispatch(getOrders()).then(() => setLoading(false));
    getBounce();
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(FuseUtils.filterArrayByString(orders, searchText));
      setPage(0);
    } else {
      setData(orders);
    }
  }, [orders, searchText]);

  const getBounce = async () => {
    axios
      .get(`${baseURL}/campaign/${JSON.parse(auth)._id}`)
      .then((response) => {
        console.log("hi", response.data);
        setData1(response.data);
      })
      .catch((err) => console.error(err));
  };

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  //function handleClick(item) {
  //  props.navigate(`/apps/e-commerce/orders/${item.id}`);
  // }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no Campaign!
        </Typography>
      </motion.div>
    );
  }

  const goto = async (userId, id) => {
    setSpinner(true);
    console.log(id);
    let result = await fetch(
      `${baseURL}/campaign/${id}/${JSON.parse(auth).apiKey}/${userId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    setSpinner(false);
    if(result.Status === "Success"){
      alert(`Sucssefuly Updated ${result.subject}`);
    } else{
      alert(`Oops! not able to update  ${result.subject}. Try Again in some time!!`);
    }
  };

  const check = async (id) => {
    navigate(`/campaign-test-result/${id}`);
  };

  return (
    <div className="w-full flex flex-col min-h-full">
    
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <OrdersTableHead
            selectedOrderIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data1,
              [
                (o) => {
                  switch (data1.id) {
                    case "id": {
                      return parseInt(o.id, 10);
                    }
                    case "customer": {
                      return o.customer.firstName;
                    }
                    case "payment": {
                      return o.payment.method;
                    }
                    case "date": {
                      return o.payment.method
                    }
                    default: {
                      return o[data1.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    //onClick={(event) => handleClick(n)}
                  >

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n.subject}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.status}
                    </TableCell>

                    {/* <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      
                      {n.created}
                    </TableCell> */}

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {new Date(n.updated).toLocaleDateString(
                        "locale",

                        {
                          dateStyle: "full",
                        }
                      )}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 underline"
                      component="th"
                      scope="row"
                    >
                      <Button onClick={() => goto(n._id, n.id)}>Update</Button>
                      <Backdrop
                        sx={{
                          opacity: "0",
                          color: "#000000",
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        
                        open={spinner}
                      >
                        <CircularProgress color="success" />
                      </Backdrop>
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 underline"
                      component="th"
                      scope="row"
                    >
                      <Button onClick={() => check(n._id)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(OrdersTable);
