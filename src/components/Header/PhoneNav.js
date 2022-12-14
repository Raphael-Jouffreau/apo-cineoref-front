// ? Import modules
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setOpenMenu } from '../../features/listSlice';

// ? Composant
function PhoneNav() {
  const dispatch = useDispatch();
  const islogged = useSelector(({ auth }) => auth.isLoggedIn);
  const openMenu = useSelector(({ list }) => list.openMenu);

  return (
    <div className="phoneNav absolute left-[45%] font-bold phone:left-[40%]">
      <button
        type="button"
        className="menu-button py-2 px-3 font-bold rounded phone:py-1 phone:px-2"
        onClick={() => dispatch(setOpenMenu())}
      >
        Menu
      </button>
      {openMenu
        && (
          <nav className="navMenu absolute z-50 top-14 left-[-29.5rem] flex flex-col text-center phone:top-10 phone:left-[-30rem]" onClick={() => dispatch(setOpenMenu())}>
            {!islogged && <Link to="/registration">Inscription</Link>}
            <Link to="/list/listcategory/movie">Films</Link>
            <Link to="/list/listcategory/serie">Séries</Link>
            <Link to="/list/listcategory/anime">Animés</Link>
            <Link to="/list/listcategory/cartoon">Dessins animés</Link>
            <Link to="/list/listartist">Artistes</Link>
            <Link to="/list/listcharacter">Personnages</Link>
            {islogged && (<Link to="/bookmarks">Favoris</Link>)}
          </nav>
        )}
    </div>
  );
}

export default React.memo(PhoneNav);
