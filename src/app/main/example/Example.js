import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import DemoContent from "@fuse/core/DemoContent";

function ExamplePage(props) {
  return (
    <div className="bg-[#FFF6CF] h-full w-full ">
      <div className="flex-col justify-between">
        <div className="">
          <img
            className=" h-36"
            src="https://s3-alpha-sig.figma.com/img/80e7/da20/f779c92506c5caf4dd738864fe537b92?Expires=1657497600&Signature=IP8nPB58GA0UvOf1t2wByfRO9AvcaLyrGU22Nr6YJzQroSFtzSN~CUOKjU3IUhOu64tCSeZnbhNeY2HSo5p0JxiIWcMB5uJPbDsqVOH16T1iqJtRsAmFL6EDFTFVm-FODd9Bi-BgZVN67KqrnTuN1bdc53g2y5PlTMXC3L~oELcQ6vBmwR-HH3I9b9GIXXVksW3mJVtymOE2GyQxwzH~Gj-LqJ3jdTehFOw5Sq0XSDRmRm2SpxAIm55ZVRFExplc0Bx6zkldIxDwbF88Mu-3JLxZn92xj0IQtxKgunZsnz75wfrSm1ao4ZEY87GA-M~~jZYwe~uLu-XCR3eNEFw~2g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt="logo"
          />
        </div>
        <div>
          <h1>Home</h1>
        </div>
        <div>
          <h1>Home</h1>
        </div>
        <div>
          <h1>Home</h1>
        </div>
        <div>
          <h1>Home</h1>
        </div>
      </div>
    </div>
  );
}

export default ExamplePage;
