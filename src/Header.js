import React from "react";
import "./Header.css";
import Login from "./Login";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/Login"} className="header_clearlink">
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello
              {!user ? ` Guest` : " " + user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? `Sign Out` : `Sign In`}
            </span>
          </div>
        </Link>
        <Link to="/orders" className="header_clearlink">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout" className="header_clearlink">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Header;

//     <div className="header">
//       <img
//         className="header__logo"
//         src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"

//         // <a href="https://www.freeiconspng.com/img/21113" title="Image from freeiconspng.com"><img src="" width="350" alt="amazon black icon" /></a>
//       />
//       <div className="header_search">
//         <input className="header_searchInput" type="text" />
//         <SearchIcon className="header_searchIcon" />
//       </div>
//       <div className="header_nav">
//         <div className="header_option">
//           <span className=" header_optionLineOne">Hello Guest</span>
//           <span className=" header_optionLineTwo">Sign In </span>
//         </div>
//         <div className="header_option">
//           <span className=" header_optionLineOne">Returns </span>
//           <span className=" header_optionLineTwo">and Order </span>
//         </div>
//         <div className="header_option">
//           <span className=" header_optionLineOne">Your </span>
//           <span className=" header_optionLineTwo">Prime </span>
//         </div>
//         <ShoppingBasketIcon className="header_optionBasket" />
//         <span className=" header_optionBasket header_bascketCount">0</span>
//       </div>
//     </div>
//   );
// }
