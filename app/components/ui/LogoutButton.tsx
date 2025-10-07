"use client";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../lib/auth";
import { setUser } from "../../slices/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    dispatch(setUser(null));
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-600 text-white px-4 py-2 rounded mt-2"
    >
      Logout
    </button>
  );
}
