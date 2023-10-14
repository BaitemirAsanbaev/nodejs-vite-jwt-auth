import { useContext, useState } from "react";
import styles from "./Login.module.scss";
import { Context } from "../main";
import { observer } from 'mobx-react-lite'

function LoginForm() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {store} = useContext(Context)

  return (
    <div className={styles.LoginForm}>
      <div>{store.user.email}</div>
      <div>{store.isAuthed}</div>
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        value={email}
        id="email"
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        id="password"
        placeholder="Password"
      />
      <button onClick={()=>store.login(email, password)}>Login</button>
      <button onClick={()=>store.registration(email, password)}>Register</button>
    </div>
  );
}
export default observer(LoginForm)