import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

function EmptyListCleanContent() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
      initial="hidden"
      animate="show"
    >
      <motion.div className="sm:col-span-6">
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
          <Typography className="text-3xl p-24 font-medium tracking-tight leading-6 truncate">
            Cleaning in progress. Please check back later. You will also receive
            an email once the cleaning is done
          </Typography>
        </Paper>
      </motion.div>
    </motion.div>
  );
}

export default EmptyListCleanContent;
