/* <div className="flex flex-col sm:flex-row bg-[#FFF6CF] items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
       <img className="w-[170px] ml-[330px]  absolute mt-[48px] h-36" src="https://s3-alpha-sig.figma.com/img/80e7/da20/f779c92506c5caf4dd738864fe537b92?Expires=1657497600&Signature=IP8nPB58GA0UvOf1t2wByfRO9AvcaLyrGU22Nr6YJzQroSFtzSN~CUOKjU3IUhOu64tCSeZnbhNeY2HSo5p0JxiIWcMB5uJPbDsqVOH16T1iqJtRsAmFL6EDFTFVm-FODd9Bi-BgZVN67KqrnTuN1bdc53g2y5PlTMXC3L~oELcQ6vBmwR-HH3I9b9GIXXVksW3mJVtymOE2GyQxwzH~Gj-LqJ3jdTehFOw5Sq0XSDRmRm2SpxAIm55ZVRFExplc0Bx6zkldIxDwbF88Mu-3JLxZn92xj0IQtxKgunZsnz75wfrSm1ao4ZEY87GA-M~~jZYwe~uLu-XCR3eNEFw~2g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="logo" />
      <div className="flex-1 grid justify-items-end  ">
        <div className="h-[700px]  pt-52 pb-0 pl-112 mt-[158px] bg-[#f1e7b8] rounded-tl-32 rounded-bl-32 w-[630px] grid place-content-center   bg-[url('https://s3-alpha-sig.figma.com/img/007c/8af0/b51aaed3f914bf43e7208d387c062466?Expires=1657497600&Signature=Ep66zMpKb4XHSyCVNq9xN7ZIUBEI~k61JXIcM9Kd5khfp76H5WApDarJA88AA9Qblzus32GL145EfTlGnlTweC0EVVP4dZvl665wfQRE30CcH5PO9lXkVSfMbA9Uu6kCXHUlQfvdw4nAoInXii7xvEcM3N2w6kPfyrLGcecBFF46zKXYCEKXLFWgMZ2SFdVFSGA9x-M0wBX0aBIr2Y2Fo7hwUBOAUM1l98YH6-NOf6Ca5-aNcPyfuVwuTIxYC6y~2KN-C-zSTYSGoNesjspv36nLFnkW4c704Su78ParqqETr5dwoOjf3Zo6JuFYCaRmtGwFScN5ZoCd6BSoJebrtg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA')]">
        <div className="text-[34px] font-bold leading-none text-black ">
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div className="mt-44 text-[16px] w-2/3 tracking-tight leading-6 text-black">
            Fuse helps developers to build organized and well coded dashboards full of beautiful and
            rich modules. Join us and start building your application today.
          </div>
        </div>
      </div>
      <div className="flex-1 grid justify-items-start mt-[158px] ">
      <Paper className="h-[700px] max-h-[700px] w-full sm:h-auto md:flex md:items-baseline  md:justify-start  sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none lg:rounded-tr-32 lg:rounded-br-32 sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full h-[700px] p-10  max-w-320 sm:w-320 mx-auto sm:mx-0 ">
          <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight">
            Sign up
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-4" to="/sign-in">
              Sign in
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Display name"
                  autoFocus
                  type="name"
                  error={!!errors.displayName}
                  helperText={errors?.displayName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
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

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password (Confirm)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl
                  className="items-center"
                  error={!!errors.acceptTermsConditions}
                >
                  <FormControlLabel
                    label="I agree to the Terms of Service and Privacy Policy"
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>
                    {errors?.acceptTermsConditions?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Create your free account
            </Button>
          </form>
        </div>
      </Paper>
      </div>
      
    </div>*/