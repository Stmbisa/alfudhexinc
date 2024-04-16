import styles from "./register.module.css";
import { handleGoogleLogin } from "@/lib/action";
import RegisterForm from "@/components/registerForm/registerForm";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <form action={handleGoogleLogin}>
          <button className={styles.google}>Sign Up with Google</button>
        </form>
        <RegisterForm/>
      </div>
    </div>
  );
};

export default RegisterPage;
