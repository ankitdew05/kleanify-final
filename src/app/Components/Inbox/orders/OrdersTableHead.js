import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import TableHead from "@mui/material/TableHead";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { darken, lighten } from "@mui/material/styles";
import { removeOrders } from "../store/ordersSlice";

const rows = [
  {
    id: "id",
    align: "left",
    disablePadding: false,
    label: "Name",
    tip: "ID of your campaigns in Klaviyo",
    sort: true,
  },

  {
    id: "subject",
    align: "left",
    disablePadding: false,
    label: "Subject",
    tip: "Subject of your campaigns",
    sort: true,
  },

  {
    id: "status",
    align: "left",
    disablePadding: false,
    label: "Status",
    tip: "Current Status of your campaigns in Klaviyo",
    sort: true,
  },

  {
    id: "updated",
    align: "left",
    disablePadding: false,
    label: "Last Updated",
    tip: " Date & time when your campaign was last updated in Klaviyo",
    sort: true,
  },
  {
    id: "Updated",
    align: "left",
    disablePadding: false,
    label: "Update",
    tip: "Update your campaign data in Kleanify",
    sort: true,
  },
  {
    id: "View Detail",
    align: "left",
    disablePadding: false,
    label: "View Details",
    tip: "View details, request testing & test scores of your campaigns",
    sort: true,
  },
];

function OrdersTableHead(props) {
  console.log(props)
  const auth = localStorage.getItem("user");
  const { selectedOrderIds } = props;
  const numSelected = selectedOrderIds.length;

  const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedOrdersMenu(event) {
    setSelectedOrdersMenu(event.currentTarget);
  }

  function closeSelectedOrdersMenu() {
    setSelectedOrdersMenu(null);
  }

  // const {onSelectAllClick, order, orderBy, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              lauda={console.log("Props")}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title={row.tip}
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default OrdersTableHead;
