"use client";
import { login } from "@lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form className={styles.form} action={formAction}>
      <div>
        <label>username</label>
        <input type="text" placeholder="username" name="username" />
      </div>
      <div>
        <label>password</label>
        <input type="password" placeholder="********" name="password" />
      </div>
      <button>Login</button>
      {state?.error}
      <Link href="/register">
        {"Don't have an account?"}
        <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;