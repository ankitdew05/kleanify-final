import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function SignOutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      localStorage.clear();
      navigate('/signin')
    }, 1000);
  }, []);

  return (
    <div className="flex bg-[#FFF6CF] flex-col flex-auto items-center sm:justify-center min-w-0">
    <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
      <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
      <img
            className="w-128 h-36"
            src="https://s3-alpha-sig.figma.com/img/80e7/da20/f779c92506c5caf4dd738864fe537b92?Expires=1657497600&Signature=IP8nPB58GA0UvOf1t2wByfRO9AvcaLyrGU22Nr6YJzQroSFtzSN~CUOKjU3IUhOu64tCSeZnbhNeY2HSo5p0JxiIWcMB5uJPbDsqVOH16T1iqJtRsAmFL6EDFTFVm-FODd9Bi-BgZVN67KqrnTuN1bdc53g2y5PlTMXC3L~oELcQ6vBmwR-HH3I9b9GIXXVksW3mJVtymOE2GyQxwzH~Gj-LqJ3jdTehFOw5Sq0XSDRmRm2SpxAIm55ZVRFExplc0Bx6zkldIxDwbF88Mu-3JLxZn92xj0IQtxKgunZsnz75wfrSm1ao4ZEY87GA-M~~jZYwe~uLu-XCR3eNEFw~2g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt="logo"
          />

        <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
          You have signed out!
        </Typography>
      </div>
    </Paper>
  </div>
  );
}

export default SignOutPage;
