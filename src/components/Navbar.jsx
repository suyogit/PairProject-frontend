import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      // Handle error
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          PairProject
        </Link>
      </div>

      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">Hi, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={toggleDropdown} // Toggle dropdown on click
            >
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={user.photoUrl} />
              </div>
            </div>
            {dropdownOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link
                    to="/profile"
                    className="justify-between"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections" onClick={closeDropdown}>
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" onClick={closeDropdown}>
                    Requests
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      handleLogout();
                      closeDropdown();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
