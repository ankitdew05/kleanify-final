import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SuccessPage() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Successfull Payment to Kleanify";
    console.log(params);
    setTimeout(() => {
      navigate(`/buy-credits`);
    }, 2000);
  }, []);

  return (
    <div className="flex bg-[#FFF6CF] flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <a href="https://app.kleanify.co">
            <img
              className="w-128 h-36"
              src="https://kleanify.co/wp-content/uploads/2022/05/Kleanify-Full-Logo.png"
              alt="Kleanify-Logo"
            />
          </a>
          <Typography className="mt-32 text-4xl text-green-700 font-extrabold tracking-tight leading-tight text-center">
            Payment Success. Credits Added to Account.
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default SuccessPage;
