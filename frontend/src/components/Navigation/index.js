import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar/SearchBar';
import { login } from '../../store/session';
import SlideOutCart from '../Cart/slideout-cart';
import { purchaseFromCart } from "../../store/shoppingCart";
// import SignUpForm from '../SignupFormPage/SignUpForm.js';
import SignUpForm from "../SignupFormPage/SignupForm"
import LoginForm from '../LoginFormPage/LoginForm';
import * as sessionActions from '../../store/session';

import './Navigation.css';
import { Box, Menu, MenuButton, MenuItem, Button, MenuList } from '@chakra-ui/react';

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const grabAllShoes = useSelector(state => state.shoes)

  // const [query, setQuery] = useState("");

  const demoLogin = () => {
    let credential = 'demo@user.io'
    let password = 'password'
    navigate('/home')
    return dispatch(login({ credential, password }))
  }

  const logout = async (e) => {
    e.preventDefault();
    //Clears cart but need to figure out a way to clear cart for other users but leaves cart for logged out user
    dispatch(purchaseFromCart());
    dispatch(sessionActions.logout());
    navigate('/')
  };

  // Semver
  // small = patch
  // mid = minor change


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <Box className="nav-logged-in">
        {/* need to change classname */}
        <Box className="web-title">
          <a href="/home" id="web-title-redirect">
            SNKR Market
          </a>

        </Box>


        <Box id="search-bar-container">
          <SearchBar shoes={grabAllShoes} />
        </Box>

        <Box className="nav-control-btns">
          {/* <NavLink exact to="/home">
            <Button className="nav-button">
              Old Home
            </Button>
          </NavLink> */}

          <NavLink exact to="/home">
            <Button
              color='rgba(255,255,255,1)' background='none' border-radius='square' letter-spacing='0.35em' font-size='0.7em' padding='0.9em 4em'
              _hover={{ color: "rgba(0,0,0,0.8)", background_color: "#fff", box_shadow: "inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)" }}

            >
              Home
            </Button>
          </NavLink>

          <NavLink to="/shoes/new">
            <Button
              color='rgba(255,255,255,1)' background='none' border-radius='square' letter-spacing='0.35em' font-size='0.7em' padding='0.9em 4em'
              _hover={{ color: "rgba(0,0,0,0.8)", background_color: "#fff", box_shadow: "inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)" }}
            >
              Sell
            </Button>
          </NavLink>

          <NavLink to="/profile">
            <Button
              color='rgba(255,255,255,1)' background='none' border-radius='square' letter-spacing='0.35em' font-size='0.7em' padding='0.9em 4em'
              _hover={{ color: "rgba(0,0,0,0.8)", background_color: "#fff", box_shadow: "inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)" }}
            >
              Profile
            </Button>
          </NavLink>

          <Box >
            <Button onClick={logout}
              color='rgba(255,255,255,1)' background='none' border-radius='square' letter-spacing='0.35em' font-size='0.7em' padding='0.9em 4em'
              _hover={{ color: "rgba(0,0,0,0.8)", background_color: "#fff", box_shadow: "inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)" }}
            // padding='0.9em 4em'

            >Log out</Button>
          </Box>

          <Box mr='30px'
          // transition='background-color 0.3s, box-shadow 0.3s, color 0.3s'
          >
            <SlideOutCart />
          </Box>

          {/* <Box >
            <ProfileButton user={sessionUser} />
          </Box> */}







        </Box>
      </Box>

    );
  } else {
    sessionLinks = (
      <Box className="nav-logged-out">
        <Box className="web-title-logged-out">
          <a href="/" id="web-title-redirect">
            SNKR MRKT
          </a>
        </Box>


          <LoginForm />

          <SignUpForm />


        <Button
          color='rgba(255,255,255,1)' background='none' border-radius='square' letter-spacing='0.35em' font-size='0.7em' padding='0.9em 4em'
          _hover={{ color: "rgba(0,0,0,0.8)", background_color: "#fff", box_shadow: "inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)" }}
          onClick={demoLogin} >
          Demo
        </Button>

        <NavLink exact to="/">
          <Button
            color='rgba(255,255,255,1)' background='none' border-radius='square' letter-spacing='0.35em' font-size='0.7em' padding='0.9em 4em'
            _hover={{ color: "rgba(0,0,0,0.8)", background_color: "#fff", box_shadow: "inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)" }}
          >
            Home
          </Button>
        </NavLink>

        <NavLink exact to="/home">
          <Button
            color='rgba(255,255,255,1)' background='none' border-radius='square' letter-spacing='0.35em' font-size='0.7em' padding='0.9em 4em'
            _hover={{ color: "rgba(0,0,0,0.8)", background_color: "#fff", box_shadow: "inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)" }}
          >
            All Shoes
          </Button>
        </NavLink>

      </Box>
    );
  }

  return (
    <nav >
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
