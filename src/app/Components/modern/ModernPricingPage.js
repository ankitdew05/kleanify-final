import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { darken } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import { motion } from "framer-motion";
import ModernPricingCard from "./ModernPricingCard";
import ModernPricingFeatureItem from "./ModernPricingFeatureItem";
import axios from "axios";
import baseURL from "../../common/baseURL";
import Navbar from "../navbar";

function ModernPricingPage() {
  const [period, setPeriod] = useState("year");
  const [data, setData] = useState([""]);
  useEffect(() => {
    document.title = "Pricing-Kleanify";
    getBounce();
  }, []);
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const getBounce = async () => {
    axios
      .get(`${baseURL}/plan`)
      .then((response) => {
        setData(response.data);
        //console.log(response.data);
      })
      .catch((err) => console.error(err));
  };

  const item = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative bg-[#FFF6CF] opacity-[99%]  flex flex-col flex-auto min-w-0 overflow-hidden">
      <Navbar />
      <div className="relative pt-32 pb-48 sm:pt-80 sm:pb-96 px-24 sm:px-64 overflow-hidden">
        <svg
          className="-z-1 absolute  inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: "#FCB900" }}
            className="opacity-30"
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
            <h2 className="text-xl font-semibold">PRICING</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          >
            <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
              Simple pricing for everyone
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
          >
            <Typography
              className="mt-12 sm:text-2xl text-center tracking-tight"
              color="text.secondary"
            >
              Pricing built for businesses of all sizes.
              <br />
              Always know what you’ll pay.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
          >
            <Box
              className="flex items-center mt-32 sm:mt-64 p-2 rounded-full overflow-hidden"
              sx={{
                backgroundColor: (theme) =>
                  darken(theme.palette.background.default, 0.05),
              }}
            >
              <Box
                component="button"
                className={clsx(
                  "h-40 items-center px-16 cursor-pointer rounded-full font-medium",
                  period === "year" && "shadow"
                )}
                onClick={() => setPeriod("year")}
                sx={{
                  backgroundColor: period === "year" ? "background.paper" : "",
                }}
                type="button"
              >
                Yearly billing
              </Box>

              <Box
                component="button"
                className={clsx(
                  "h-40 items-center px-16 cursor-pointer rounded-full font-medium",
                  period === "month" && "shadow"
                )}
                onClick={() => setPeriod("month")}
                sx={{
                  backgroundColor: period === "month" ? "background.paper" : "",
                }}
                type="button"
              >
                Monthly billing
              </Box>
            </Box>
          </motion.div>
        </div>

        {/* <div className="flex justify-center mt-40 sm:mt-80">
          <div className="w-full max-w-sm md:max-w-7xl">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 lg:gap-y-0 md:gap-x-24"
            >
              {data.map((value, item) => (
               
                <motion.div variants={item}>
                  <ModernPricingCard
                    period={period}
                    title={value.title}
                    subtitle={value.subtitle}
                    yearlyPrice={value.yearlyPricing}
                    monthlyPrice={value.monthlyPrice}
                    discountPrice={value.discountPrice}
                    buttonTitle="Get Started"
                    planId={value._id}
                    details={
                      <div className="flex flex-col mt-48">
                        <Typography className="font-semibold">
                          Core features, including:
                        </Typography>
                        <div className="mt-16 space-y-8">
                          <div className="flex">
                            <FuseSvgIcon className="text-green-600" size={20}>
                              heroicons-solid:check
                            </FuseSvgIcon>
                            <Typography className="ml-2 leading-5">
                              Email Validation -{" "}
                              <b>{value.emailValidationCredit}</b> credits every
                              month
                            </Typography>
                          </div>
                          <div className="flex">
                            <FuseSvgIcon className="text-green-600" size={20}>
                              heroicons-solid:check
                            </FuseSvgIcon>
                            <Typography className="ml-2 leading-5">
                            Automated List Cleaning every week 
                            </Typography>
                          </div>
                          <div className="flex">
                            <FuseSvgIcon className="text-green-600" size={20}>
                              heroicons-solid:check
                            </FuseSvgIcon>
                            <Typography className="ml-2 leading-5">
                              Content Spam & Inbox placement Tests -{" "}
                              <b>{value.testingCredit}</b> credits every month
                            </Typography>
                          </div>
                          
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div> */}

        <div className="flex justify-center mt-40 sm:mt-80">
          <div className="w-full max-w-sm md:max-w-7xl">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 lg:gap-y-0 md:gap-x-24"
            >
              <motion.div variants={item}>
                <ModernPricingCard
                  period={period}
                  title="Starter"
                  subtitle="Perfect for an individual or a small team starting to get bigger"
                  yearlyPrice="$468.00"
                  monthlyPrice="$49.00"
                  discountPrice = "$39.00"
                  buttonTitle="Get Started"
                  yearLink= "https://buy.stripe.com/test_5kA5m9fpx9F1fLOeUV"
                  monthLink = "https://buy.stripe.com/eVa00l6yt2p29fq7sD"
                  details={
                    <div className="flex flex-col mt-48">
                      <Typography className="font-semibold">
                        Core features, including:
                      </Typography>
                      <div className="mt-16 space-y-8">
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Email Validation <b>2000 </b> credits every month
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Automated List Cleaning every week
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Content Spam & Inbox placement Tests -<b>10 </b>{" "}
                            credits every month
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-red-600" size={20}>
                            heroicons-solid:x
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Manual Klaviyo Health Audit by an expert every month
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-red-600" size={20}>
                            heroicons-solid:x
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Priority Support
                          </Typography>
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>
              <motion.div variants={item}>
                <ModernPricingCard
                  period={period}
                  title="Pro"
                  subtitle="Perfect for growing teams wanting to be in more control"
                  yearlyPrice="$948.00"
                  monthlyPrice="$99.00"
                  discountPrice = "$79.00"
                  yearLink= "https://buy.stripe.com/3cs7sN1e99Ru9fq28m"
                  monthLink = "https://buy.stripe.com/14kcN7e0V8NqdvG4gt"
                  buttonTitle="Get Started"
                  details={
                    <div className="flex flex-col mt-48">
                      <Typography className="font-semibold">
                        Core features, including:
                      </Typography>
                      <div className="mt-16 space-y-8">
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Email Validation <b>10,000 </b> credits every month
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Automated List Cleaning every week
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Content Spam & Inbox placement Tests -<b>25</b>{" "}
                            credits every month
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-red-600" size={20}>
                            heroicons-solid:x
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Manual Klaviyo Health Audit by an expert every month
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-red-600" size={20}>
                            heroicons-solid:x
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Priority Support
                          </Typography>
                        </div>
                      </div>
                    </div>
                  }
                  
                />
              </motion.div>
              <motion.div variants={item}>
                <ModernPricingCard
                  period={period}
                  title="Enterprise"
                  subtitle="Perfect for companies wanting advanced tools and support"
                  yearlyPrice="$1788.00"
                  monthlyPrice="$199.00"
                  discountPrice = "$149.00"
                  buttonTitle="Get Started"
                  yearLink= "https://buy.stripe.com/9AQ00lcWR5Be9fqcN2"
                  monthLink = "https://buy.stripe.com/3cs4gBbSN2p20IU6oD"
                  details={
                    <div className="flex flex-col mt-48">
                      <Typography className="font-semibold">
                        Core features, including:
                      </Typography>
                      <div className="mt-16 space-y-8">
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Email Validation <b>30,000 </b> credits every month
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Automated List Cleaning every week
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Content Spam & Inbox placement Tests -<b>60 </b>{" "}
                            credits every month
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Manual Klaviyo Health Audit by an expert every month
                          </Typography>
                        </div>
                        <div className="flex">
                          <FuseSvgIcon className="text-green-600" size={20}>
                            heroicons-solid:check
                          </FuseSvgIcon>
                          <Typography className="ml-2 leading-5">
                            Priority Support
                          </Typography>
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center mt-52">
          <FuseSvgIcon className="text-green-600" size={20}>
            heroicons-solid:check
          </FuseSvgIcon>
          <Typography className="ml-2 leading-5">Buy Additional Validation Credits for $0.001 per email</Typography>
        </div>
        <div className="flex justify-center">
          <FuseSvgIcon className="text-green-600" size={20}>
            heroicons-solid:check
          </FuseSvgIcon>
          <Typography className="ml-2 leading-5">Buy Additional Testing Credits for $1 per test</Typography>
        </div>
      </div>
      <Paper className="flex flex-col items-center px-24 py-40 sm:px-64 sm:pt-72 sm:pb-80">
        <div className="w-full max-w-7xl">
          <div>
            <Typography className="text-4xl font-extrabold tracking-tight leading-tight">
              Everything you need to improve Klaviyo deliverability
            </Typography>
            <Typography
              className="max-w-xl mt-2 text-xl"
              color="text.secondary"
            >
              Start improving your Klaviyo performance using our tools, be
              efficient, spend less time with details more time with your
              business
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-x-24 gap-y-48 sm:grid-cols-2 lg:grid-cols-3 lg:gap-64 w-full mt-48 sm:mt-64">
            <ModernPricingFeatureItem
              icon="heroicons-outline:pencil-alt"
              title="Email Validation"
              subtitle="Automatically remove invalid email addresses before sending emails to them."
            />
            <ModernPricingFeatureItem
              icon="heroicons-outline:filter"
              title="Unengaged Email Cleaner"
              subtitle="Automatically clean unengaged email subscribers to maintain a clean list & reduce Klaviyo cost."
            />
            <ModernPricingFeatureItem
              icon="heroicons-outline:refresh"
              title="Campaign Check"
              subtitle="Identify “risky” content in your email campaigns before you send them."
            />
            <ModernPricingFeatureItem
              icon="heroicons-outline:tag"
              title="Inbox Placement Check"
              subtitle="Figure out if your email campaigns are going to spam, inbox, promotions or other sub-folders at Gmail, Outlook & all major ISPs"
            />
            <ModernPricingFeatureItem
              icon="heroicons-outline:document-text"
              title="Inbox Delivery Check"
              subtitle="Improve your email revenue by improving your inbox delivery rate while saving time.
"
            />
            <ModernPricingFeatureItem
              icon="heroicons-outline:chart-square-bar"
              title="Spam Filter"
              subtitle="Identify deliverability issues in your emails by automatic testing across common spam filters such as Google Spam Filter, Barracuda, SpamAssassin, and Mimecast.
"
            />
          </div>
        </div>
      </Paper>
      {/* <Box
        sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
        className="px-24 py-40 sm:py-48 sm:px-64"
      >
        {/* <div className="flex flex-col items-center w-full max-w-7xl mx-auto text-center">
          <Typography className="text-3xl sm:text-4xl sm:text-5xl font-extrabold leading-6 sm:leading-10">
            Boost your productivity.
          </Typography>
          <Typography
            className="mt-8 text-3xl sm:text-4xl sm:text-5xl font-extrabold leading-6 sm:leading-10"
            color="text.secondary"
          >
            Start using Fuse today.
          </Typography>
          <Button
            className="mt-32 px-48 text-lg"
            size="large"
            color="secondary"
            style={{
              backgroundColor: '#FCB900'
            }}
            variant="contained"
          >
            Sign up for free
          </Button>
        </div> 
      </Box>

      <div className="flex flex-col items-center pt-12 sm:pt-72 pb-32 sm:pb-80 px-24 sm:px-64">
        <div className="w-full max-w-7xl">
          <div>
            <Typography className="text-4xl font-extrabold tracking-tight leading-tight">
              Frequently asked questions
            </Typography>
            <Typography className="max-w-xl mt-8 text-xl" color="text.secondary">
              Here are the most frequently asked questions you may check before getting started
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-x-24 gap-y-48 sm:grid-cols-2 lg:gap-x-64 w-full mt-48 sm:mt-64">
            <div>
              <Typography className="text-xl font-semibold">
                What is the duration of the free trial?
              </Typography>
              <Typography className="mt-8 leading-6" color="text.secondary">
                Our app is free to try for 14 days, if you want more, you can provide payment
                details which will extend your trial to 30 days providing you an extra 16 more days
                to try our app.
              </Typography>
            </div>
            <div>
              <Typography className="text-xl font-semibold">
                Are there discounts for non-profits or educational use?
              </Typography>
              <Typography className="mt-2 leading-6" color="text.secondary">
                Yes, our Personal and Premium packages are free for non-profits and educational use.
                E-mail your details to us after starting your Free Trial and we will upgrade your
                account if you qualify.
              </Typography>
            </div>
            <div>
              <Typography className="text-xl font-semibold">What is the storage is for?</Typography>
              <Typography className="mt-8 leading-6" color="text.secondary">
                Since we provide an extremely detailed reporting and analytics tool, they require
                quite a bit storage space. For average use, you don’t have to worry about running
                out of space since the Personal package limits the projects you can have.
              </Typography>
              <Typography className="mt-8 leading-6" color="text.secondary">
                For some reason if you run out of space, contact us and we will see what can be done
                about it and make sure you are not generating unnecessary reports and/or analytics
                data.
              </Typography>
            </div>
            <div>
              <Typography className="text-xl font-semibold">
                What happens if I’m not satisfied?
              </Typography>
              <Typography className="mt-8 leading-6" color="text.secondary">
                If you are still in your free trial period, you can cancel your account at anytime
                with a single click of a button. If you already paid for your first month, we also
                offer 30-day money-back guarantee with no questions asked.
              </Typography>
              <Typography className="mt-8 leading-6" color="text.secondary">
                After first month, you can still cancel your account at any time but we will
                calculate the amount that corresponds to days you have been using our app for that
                month and refund only the remaining amount.
              </Typography>
            </div>
          </div>
        </div>
      </div>  */}
    </div>
  );
}

export default ModernPricingPage;
