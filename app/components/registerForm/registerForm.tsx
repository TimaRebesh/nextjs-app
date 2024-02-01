import styles from "./registerForm.module.css";
import { register } from "@lib/actions";

const RegisterForm = () => {
  // const [state, formAction] = useFormState(register, undefined);

  // const router = useRouter();

  // useEffect(() => {
  //   state?.success && router.push("/login");
  // }, [state?.success, router]);

  return (
    <form className={styles.form} action={register}>
      <div>
        <label>username</label>
        <input type="text" placeholder="name" name="username" />
      </div>
      <div>
        <label>email</label>
        <input type="email" placeholder="someemail@some.some" name="email" />
      </div>
      <div>
        <label>password</label>
        <input type="password" placeholder="********" name="password" />
      </div>
      <div>
        <label>confirm password</label>
        <input
          type="password"
          placeholder="********"
          name="passwordRepeat"
        />
      </div>
      <button>Register</button>
      {/* {state?.error}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link> */}
    </form>
  );
};

export default RegisterForm;