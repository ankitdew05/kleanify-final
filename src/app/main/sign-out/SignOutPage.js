import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import JwtService from '../../auth/services/jwtService';

function SignOutPage() {
  useEffect(() => {
    setTimeout(() => {
      JwtService.logout();
    }, 1000);
  }, []);

  return (
  

    <div className="flex flex-col sm:flex-row bg-[#FFF6CF] items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <img
        className="w-[170px] ml-[330px]  absolute mt-[48px] h-36"
        src="https://s3-alpha-sig.figma.com/img/80e7/da20/f779c92506c5caf4dd738864fe537b92?Expires=1657497600&Signature=IP8nPB58GA0UvOf1t2wByfRO9AvcaLyrGU22Nr6YJzQroSFtzSN~CUOKjU3IUhOu64tCSeZnbhNeY2HSo5p0JxiIWcMB5uJPbDsqVOH16T1iqJtRsAmFL6EDFTFVm-FODd9Bi-BgZVN67KqrnTuN1bdc53g2y5PlTMXC3L~oELcQ6vBmwR-HH3I9b9GIXXVksW3mJVtymOE2GyQxwzH~Gj-LqJ3jdTehFOw5Sq0XSDRmRm2SpxAIm55ZVRFExplc0Bx6zkldIxDwbF88Mu-3JLxZn92xj0IQtxKgunZsnz75wfrSm1ao4ZEY87GA-M~~jZYwe~uLu-XCR3eNEFw~2g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        alt="logo"
      />
      <div className="flex-1 grid justify-items-end  ">
        <div className="h-[700px]  pt-52 pb-0 pl-112 mt-[158px] bg-[#f1e7b8] rounded-tl-32 rounded-bl-32 w-[630px] grid place-content-center   bg-[url('https://s3-alpha-sig.figma.com/img/007c/8af0/b51aaed3f914bf43e7208d387c062466?Expires=1657497600&Signature=Ep66zMpKb4XHSyCVNq9xN7ZIUBEI~k61JXIcM9Kd5khfp76H5WApDarJA88AA9Qblzus32GL145EfTlGnlTweC0EVVP4dZvl665wfQRE30CcH5PO9lXkVSfMbA9Uu6kCXHUlQfvdw4nAoInXii7xvEcM3N2w6kPfyrLGcecBFF46zKXYCEKXLFWgMZ2SFdVFSGA9x-M0wBX0aBIr2Y2Fo7hwUBOAUM1l98YH6-NOf6Ca5-aNcPyfuVwuTIxYC6y~2KN-C-zSTYSGoNesjspv36nLFnkW4c704Su78ParqqETr5dwoOjf3Zo6JuFYCaRmtGwFScN5ZoCd6BSoJebrtg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA')]">
          <div className="text-[34px] font-bold leading-none text-black ">
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div className="mt-44 text-[16px] w-2/3 tracking-tight leading-6 text-black">
            Fuse helps developers to build organized and well coded dashboards
            full of beautiful and rich modules. Join us and start building your
            application today.
          </div>
        </div>
      </div>
      <div className="flex-1 grid justify-items-start mt-[158px] ">
      <Paper className="flex items-center h-[700px] w-[630px] max-h-[700px]  sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">

          <Typography className="mt-32 text-[34px] font-extrabold tracking-tight leading-tight text-center">
            You have alredy signed out!
          </Typography>
          <Typography className="mt-32 text-[16px]  tracking-tight leading-tight text-center">
            Redirecting in 5sec..
          </Typography>
        </div>
      </Paper>
      </div>
    </div>
  );
}

export default SignOutPage;
