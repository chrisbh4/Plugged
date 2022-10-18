import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpModal from '../SignupFormPage';
import SearchBar from '../SearchBar/SearchBar';
import { login } from '../../store/session';
import SlideOutCart from '../Cart/slideout-cart';

import './Navigation.css';
import { Box } from '@chakra-ui/react';

function Navigation({isLoaded}) {
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

// Semver
// small = patch
// mid = minor change


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav-logged-in">
        {/* need to change classname */}
        <div className="web-title">
          <a href="/home" id="web-title-redirect">
            SNKR Market
          </a>

        </div>


        <div id="search-bar-container">
          <SearchBar shoes={grabAllShoes} />
        </div>

        <div className="nav-control-btns">
            <NavLink exact to="/home">
            <button className="nav-button">
              Home
            </button>
          </NavLink>

          <NavLink to="/shoes/new">
            <button className="nav-button">
              Sell a Snkr
            </button>
          </NavLink>
          <NavLink to="/profile">
            <button className="nav-button">
              Profile
            </button>
          </NavLink>

          <Box >
            <ProfileButton user={sessionUser} />
          </Box>






            <Box mr='30px'  >
            <SlideOutCart />
            </Box>



        </div>
      </div>

    );
  } else {
    sessionLinks = (
      <div className="nav-logged-out">
        <div className="web-title-logged-out">
          <a href="/" id="web-title-redirect">
            The Plug
          </a>
        </div>

        <button className="nav-button">
          <LoginFormModal />
        </button>

        <button className="nav-button">
          <SignUpModal />
        </button>

        <button className="nav-button" onClick={demoLogin} >
          Demo
        </button>

        <NavLink exact to="/home">
          <button className="nav-button">
            All Shoes
          </button>
        </NavLink>

        <NavLink exact to="/">
          <button className="nav-button">
            Home
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <nav >
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
