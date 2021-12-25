// import axios from "axios";
import axios from '../../../axios'
import { useAppContext, useAuthContext } from "../../../Context";
import { useNavigate } from "react-router-dom";

const useLoginHook = () => {
  const { createNotification } = useAppContext();
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();


  const login = async ({ email, password }) => {
    try {
      if (!email) {
        return createNotification("Please enter your email.", "warning");
      }
      if (!password) {
        return createNotification("Please enter your password.", "warning");
      } 

      let response = await axios.post("/login", {
        email,
        password,
      });

      let data = response.data;

      console.log(`user data from login hook is: ${data.data}`);
      console.log(data.data);
      if (!data.status) {
        createNotification(data.message, "error");
        return;
      }

      // Cookies.set("accessToken", data.accessToken, { expires: 86400 * 1000 });
      // Cookies.set("userData", JSON.stringify(data.data), {
      //   expires: 86400 * 1000,
      // });


      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('userData', data.data);

      setIsLoggedIn(true);
      
      createNotification(data.message, "success");

      navigate('/home');
      return data.data;

    } catch (e) {
      alert(e.message);
    }
  };
  return { login };
};

export default useLoginHook;
