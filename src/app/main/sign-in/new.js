/*<div className="flex flex-col md:pt-52 bg-[#FFF6CF] sm:flex-row items-center md:items-start sm:justify-center md:justify-center min-w-0">
      <Box className=" md:rounded-tl-3xl md:rounded-bl-3xl  bg-[url('https://s3-alpha-sig.figma.com/img/007c/8af0/b51aaed3f914bf43e7208d387c062466?Expires=1657497600&Signature=Ep66zMpKb4XHSyCVNq9xN7ZIUBEI~k61JXIcM9Kd5khfp76H5WApDarJA88AA9Qblzus32GL145EfTlGnlTweC0EVVP4dZvl665wfQRE30CcH5PO9lXkVSfMbA9Uu6kCXHUlQfvdw4nAoInXii7xvEcM3N2w6kPfyrLGcecBFF46zKXYCEKXLFWgMZ2SFdVFSGA9x-M0wBX0aBIr2Y2Fo7hwUBOAUM1l98YH6-NOf6Ca5-aNcPyfuVwuTIxYC6y~2KN-C-zSTYSGoNesjspv36nLFnkW4c704Su78ParqqETr5dwoOjf3Zo6JuFYCaRmtGwFScN5ZoCd6BSoJebrtg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA')] relative hidden bg-[#FEEEC0]  md:flex md:m-88 md:mr-0 flex-auto items-center justify-start h-3/4 p-64 lg:px-112 overflow-hidden">
        <div className="z-10 relative w-full max-w-3xl text-start ">
          <div className="text-7xl font-bold leading-none text-black">
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div className="mt-44 text-lg w-2/3 tracking-tight leading-6 text-black">
            Fuse helps developers to build organized and well coded dashboards
            full of beautiful and rich modules. Join us and start building your
            application today.
          </div>
          <div className="flex items-center mt-32">
            <AvatarGroup
              sx={{
                "& .MuiAvatar-root": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Avatar src="assets/images/avatars/female-18.jpg" />
              <Avatar src="assets/images/avatars/female-11.jpg" />
              <Avatar src="assets/images/avatars/male-09.jpg" />
              <Avatar src="assets/images/avatars/male-16.jpg" />
            </AvatarGroup>

            <div className="ml-16 font-medium tracking-tight text-gray-400">
              More than 17k people joined us, it's your turn
            </div>
          </div>
        </div>
      </Box>

      <Paper className=" h-full sm:h-auto md:flex md:m-88 md:ml-0  md:items-center md:justify-start  sm:w-auto md:h-3/4 md:w-2/5  py-8 px-16 sm:p-48 md:p-64  sm:rounded-none md:rounded-tr-3xl md:rounded-br-3xl sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img
            className="w-128 h-36"
            src="https://s3-alpha-sig.figma.com/img/80e7/da20/f779c92506c5caf4dd738864fe537b92?Expires=1657497600&Signature=IP8nPB58GA0UvOf1t2wByfRO9AvcaLyrGU22Nr6YJzQroSFtzSN~CUOKjU3IUhOu64tCSeZnbhNeY2HSo5p0JxiIWcMB5uJPbDsqVOH16T1iqJtRsAmFL6EDFTFVm-FODd9Bi-BgZVN67KqrnTuN1bdc53g2y5PlTMXC3L~oELcQ6vBmwR-HH3I9b9GIXXVksW3mJVtymOE2GyQxwzH~Gj-LqJ3jdTehFOw5Sq0XSDRmRm2SpxAIm55ZVRFExplc0Bx6zkldIxDwbF88Mu-3JLxZn92xj0IQtxKgunZsnz75wfrSm1ao4ZEY87GA-M~~jZYwe~uLu-XCR3eNEFw~2g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt="logo"
          />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign in
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Don't have an account?</Typography>
            <Link className="ml-4" to="/sign-up">
              Sign up
            </Link>
          </div>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link
                className="text-md font-medium"
                to="/pages/auth/forgot-password"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Sign in
            </Button>

            <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                Or continue with
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div>

            <div className="flex items-center mt-32 space-x-16">
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:facebook
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:twitter
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:github
                </FuseSvgIcon>
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </div>*/