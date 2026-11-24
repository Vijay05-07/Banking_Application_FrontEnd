import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tokenManager from "../../../services/tokenManager";

import {
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  LockKeyhole,
  Landmark,
  CircleCheck,
  LoaderCircle,
} from "lucide-react";
import { motion } from "motion/react";

import styles from "./Login.module.css";
import { authService } from "../../../services/authservice";
import { setAuthenticated } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState(
    () => localStorage.getItem("rememberedUsername") || "",
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(
    () => localStorage.getItem("rememberedUsername") !== null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const from =
    (location.state as { from?: { pathname?: string } })?.from?.pathname ||
    "/dashboard";

  const validateForm = () => {
    let valid = true;

    setUsernameError("");
    setPasswordError("");
    setError("");

    if (!username.trim()) {
      setUsernameError("Please enter your username or email.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await authService.login({
        loginId: username.trim(),
        password,
      });

      console.log("Access Token Exists:", !!tokenManager.getAccessToken());
      
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username.trim());
      } else {
        localStorage.removeItem("rememberedUsername");
      }
       dispatch(setAuthenticated(true));


      navigate(from, { replace: true });

    } catch (err) {
      authService.logout();

      const apiError = err as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
      };

      setError(
        apiError.response?.data?.message ||
          apiError.response?.data?.error ||
          "Unable to sign in. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <motion.section
        className={styles.loginSection}
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.loginContent}>
          <Link to="/" className={styles.logo}>
            <img
              src="/favicon.png"
              alt="OrvexaBank"
              className={styles.logoImage}
            />
            <span>OrvexaBank</span>
          </Link>

          <div className={styles.formWrapper}>
            <div className={styles.formHeading}>
              <span className={styles.welcomeLabel}>WELCOME BACK</span>

              <h1>Sign in to your account</h1>

              <p>
                Welcome back! Please enter your details to access your banking
                account.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="username">Email or Username</label>

                <input
                  id="username"
                  type="text"
                  placeholder="Enter your email or username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setUsernameError("");
                    setError("");
                  }}
                  autoComplete="username"
                  disabled={loading}
                />

                {usernameError && (
                  <span className={styles.fieldError}>{usernameError}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <div className={styles.passwordLabel}>
                  <label htmlFor="password">Password</label>

                  <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <div className={styles.passwordWrapper}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setPasswordError("");
                      setError("");
                    }}
                    autoComplete="current-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                {passwordError && (
                  <span className={styles.fieldError}>{passwordError}</span>
                )}
              </div>

              <div className={styles.formOptions}>
                <label className={styles.rememberLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    disabled={loading}
                  />
                  <span>Remember me</span>
                </label>
              </div>

              {error && (
                <div className={styles.errorMessage} role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className={styles.signInButton}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle size={19} className={styles.spinner} />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </form>

            <div className={styles.registerText}>
              Don't have an account?
              <Link to="/register">Create an account</Link>
            </div>

            <div className={styles.secureNote}>
              <ShieldCheck size={17} />
              <span>Your information is protected and secure.</span>
            </div>
          </div>

          <p className={styles.copyright}>
            © {new Date().getFullYear()} OrvexaBank. All rights reserved.
          </p>
        </div>
      </motion.section>

      <motion.aside
        className={styles.brandSection}
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className={styles.brandBackgroundCircle} />
        <div className={styles.brandBackgroundCircleTwo} />

        <div className={styles.brandContent}>
          <div className={styles.brandBadge}>
            <ShieldCheck size={16} />
            <span>Banking made simple and secure</span>
          </div>

          <h2>
            Your money.
            <br />
            Your future.
            <br />
            <span>Your control.</span>
          </h2>

          <p>
            Experience smarter digital banking. Manage your accounts, transfer
            money, and track your finances with confidence.
          </p>

          <div className={styles.bankPreview}>
            <div className={styles.previewHeader}>
              <div className={styles.previewBrand}>
                <div className={styles.previewIcon}>
                  <Landmark size={18} />
                </div>
                <span>OrvexaBank</span>
              </div>

              <span className={styles.previewStatus}>
                <span />
                Secure
              </span>
            </div>

            <div className={styles.previewBalance}>
              <span>Account overview</span>
              <h3>Banking made effortless</h3>
              <p>Everything you need, in one place.</p>
            </div>

            <div className={styles.previewFeatures}>
              <div>
                <div className={styles.featureIcon}>
                  <CircleCheck size={18} />
                </div>
                <span>Easy transfers</span>
              </div>

              <div>
                <div className={styles.featureIcon}>
                  <LockKeyhole size={18} />
                </div>
                <span>Secure access</span>
              </div>
            </div>
          </div>

          <div className={styles.brandFooter}>
            <ShieldCheck size={17} />
            <span>Security you can trust. Banking you can rely on.</span>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

export default Login;
