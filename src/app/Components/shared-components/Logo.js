import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <div
        className="badge flex justify-center items-center md:py-4 md:px-8 md:mx-8 rounded"
        style={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}
      ><a href='https://app.kleanify.co'>
        <img
          className=" w-128 h-36 "
          src="https://i.ibb.co/9rWTwTm/Kleanify-Full-Logo-removebg-preview.png"
          alt="logo"
        />
        </a>
      </div>
    </Root>
  );
}

export default Logo;
