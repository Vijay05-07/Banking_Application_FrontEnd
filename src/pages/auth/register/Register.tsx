import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  LockKeyhole,
  Landmark,
  CircleCheck,
  LoaderCircle,
  UserRound,
  Mail,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import styles from "./Register.module.css";
import { authService } from "../../../services/authservice";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        userName: formData.userName.trim(),
        email: formData.email.trim(),
        phoneNumber: Number(formData.phoneNumber.trim()),
        password: formData.password,
      });

      navigate("/login", {
        state: {
          message:
            "Your account has been created successfully. Please sign in.",
        },
      });
    } catch (err: unknown) {
      const response =
        typeof err === "object" && err !== null && "response" in err
          ? err.response
          : undefined;
      const message =
        typeof response === "object" &&
        response !== null &&
        "data" in response &&
        typeof response.data === "object" &&
        response.data !== null &&
        "message" in response.data &&
        typeof response.data.message === "string"
          ? response.data.message
          : undefined;

      setError(message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <motion.section
        className={styles.formSection}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.formContainer}>
          <Link to="/" className={styles.logo}>
            <img src="/favicon.png" alt="OrvexaBank logo" />
            <span>
              Orvexa<span>Bank</span>
            </span>
          </Link>

          <div className={styles.formHeading}>
            <span className={styles.eyebrow}>GET STARTED TODAY</span>

            <h1>Create your account</h1>

            <p>
              Join OrvexaBank and experience a smarter, simpler way to manage
              your money.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.nameGrid}>
              <div className={styles.field}>
                <label htmlFor="firstName">First name</label>
                <div className={styles.inputWrapper}>
                  <UserRound size={18} />
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName">Last name</label>
                <div className={styles.inputWrapper}>
                  <UserRound size={18} />
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <div className={styles.inputWrapper}>
                <UserRound size={18} />
                <input
                  id="userName"
                  name="userName"
                  placeholder="Choose a username"
                  value={formData.userName}
                  onChange={handleChange}
                  autoComplete="userName"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email address</label>
              <div className={styles.inputWrapper}>
                <Mail size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="phoneNumber">Phone number</label>
              <div className={styles.inputWrapper}>
                <Phone size={18} />
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <LockKeyhole size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className={styles.inputWrapper}>
                <LockKeyhole size={18} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <label className={styles.terms}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span>
                I agree to the <Link to="/terms">Terms and Conditions</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>.
              </span>
            </label>

            {error && (
              <div className={styles.errorMessage} role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className={styles.spinner} size={19} />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>

          <p className={styles.loginText}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <div className={styles.securityNote}>
            <ShieldCheck size={17} />
            <span>Your information is protected with secure encryption.</span>
          </div>
        </div>
      </motion.section>

      <section className={styles.brandSection}>
        <div className={styles.brandContent}>
          <div className={styles.brandTop}>
            <div className={styles.brandIcon}>
              <Landmark size={23} />
            </div>
            <span>Banking made better.</span>
          </div>

          <div className={styles.brandMessage}>
            <span className={styles.brandEyebrow}>
              YOUR FINANCIAL JOURNEY STARTS HERE
            </span>

            <h2>
              Banking that moves
              <span> with you.</span>
            </h2>

            <p>
              Take control of your finances with secure, convenient banking
              designed around your life.
            </p>
          </div>

          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <CircleCheck size={20} />
              <div>
                <strong>Simple account management</strong>
                <p>Manage your banking from one place.</p>
              </div>
            </div>

            <div className={styles.benefit}>
              <CircleCheck size={20} />
              <div>
                <strong>Security you can trust</strong>
                <p>Your financial information matters.</p>
              </div>
            </div>

            <div className={styles.benefit}>
              <CircleCheck size={20} />
              <div>
                <strong>Banking on your terms</strong>
                <p>Access your banking whenever you need it.</p>
              </div>
            </div>
          </div>

          <div className={styles.brandFooter}>
            <ShieldCheck size={18} />
            <span>Secure banking. Confident living.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
