"use client";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, loginWithFacebook } from "../../lib/auth";
import { setUser, setLoading } from "../../slices/authSlice";
import { useState } from "react";

export default function SocialLoginButtons() {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.auth.loading);
  const [error, setError] = useState("");

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    dispatch(setLoading(true));
    setError("");
    try {
      const userCredential =
        provider === "google"
          ? await loginWithGoogle()
          : await loginWithFacebook();
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 rounded w-full"
        onClick={() => handleSocialLogin("google")}
        disabled={loading}
      >
        Continue with Google
      </button>
      <button
        type="button"
        className="bg-blue-700 text-white px-4 py-2 rounded w-full"
        onClick={() => handleSocialLogin("facebook")}
        disabled={loading}
      >
        Continue with Facebook
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
