import LoginForm from "@/components/loginForm/loginForm";
import { handleGoogleLogin } from "@/lib/action";
import styles from "./login.module.css";

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGoogleLogin}>
          <button className={styles.google}>Login with Google</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
