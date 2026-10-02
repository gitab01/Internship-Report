import { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/profilephotoSelector";
import uploadImage from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const [profilepic, setProfilepic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) return setError("Please enter your name");
    if (!validateEmail(email)) return setError("Please enter a valid email address");
    if (!password) return setError("Please enter your password");
    if (password.length < 6)
      return setError("Password should be at least 6 characters");

    setError("");
    setBusy(true);
    try {
      let profileImageUrl = "";
      if (profilepic) {
        const imgUploadRes = await uploadImage(profilepic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: fullName.trim(),
        email,
        password,
        profileImageUrl,
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
        Create your account
      </h3>
      <p className="mt-1.5 text-sm text-slate-500">
        Free, and takes less than a minute.
      </p>

      <form onSubmit={handleSignUp} className="mt-8 grid gap-1">
        <ProfilePhotoSelector setImage={setProfilepic} />

        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full name"
          placeholder="Abebe Kebede"
          type="text"
          autoComplete="name"
        />
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email address"
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="At least 6 characters"
          type="password"
          autoComplete="new-password"
          hint="Use at least 6 characters."
        />

        {error && (
          <p className="mb-2 mt-1 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn-primary mt-2 disabled:opacity-70"
        >
          {busy ? "Creating account…" : "Create account"}
        </button>

        <p className="mt-4 text-center lg:text-left text-sm text-slate-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
