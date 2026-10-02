import { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError(null);
    setBusy(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout>
      <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
        Sign in
      </h3>
      <p className="mt-1.5 text-sm text-slate-500">
        Continue tracking your income and expenses.
      </p>

      <form onSubmit={handleLogin} className="mt-8 grid gap-1">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email address"
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
          autoComplete="current-password"
        />

        {error && (
          <p className="mb-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn-primary mt-2 disabled:opacity-70"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <p className="mt-4 text-center lg:text-left text-sm text-slate-600">
          New here?{" "}
          <Link to="/signUp" className="font-medium text-slate-900 underline underline-offset-2">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
