import { observer } from "mobx-react-lite";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);
  async function getUsers(){
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e);
      
    }
  }


  return (
    <>
      {store.isLoading ? (
        "Loading..."
      ) : store.isAuthed ? (
        <div>
          <h1>Welcome {store.user.email}</h1>
          <button onClick={() => store.logout()}>Logout</button>
          <button onClick={getUsers}>Load users</button>
          <div>
            {users.map((item)=>{
              return <div key={item.email}>{item.email}</div>
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1>Who are you?</h1>
          <LoginForm />
        </div>
      )}
    </>
  );
}

export default observer(App);
