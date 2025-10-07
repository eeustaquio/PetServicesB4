"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../lib/auth";
import { setUser, setLoading } from "../../slices/authSlice";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.auth.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setError("");
    setSuccess(false);
    try {
      const userCredential = await register(email, password);
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }));
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">Registration successful!</div>}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
