// import axios from "axios";
import axios from '../../../axios'
import { useAppContext, useAuthContext } from "../../../Context";

const useSignupHook = () => {
  const { createNotification } = useAppContext();
  const { setIsLoggedIn } = useAuthContext();

  const signup = async ({ email, password, firstName, lastName, phoneNumber, address, passportNumber }) => {
    try {
      if (!email) {
        return createNotification("Please enter your email.", "warning");
      }
      if (!password) {
        return createNotification("Please enter your password.", "warning");
      } 

      if (!firstName || !lastName) {
        return createNotification("Please enter your last name.", "warning");
      } 

      if (!phoneNumber) {
        return createNotification("Please enter your phone number.", "warning");
      } 

      if(!address){
        return createNotification("Please enter your address.", "warning");

      }


      if (!passportNumber) {
        return createNotification("Please enter your passport number.", "warning");
      } 

      
     

      let response = await axios.post("/register", {
        email,
        password,
        firstName, 
        lastName,
        phoneNumber,
        address,
        passportNumber
      });

      let data = response.data;

      console.log(`user data from login hook is: ${data.data}`);

      if (!data.status) {
        createNotification(data.message, "error");
        return;
      }

      // Cookies.set("accessToken", data.accessToken, { expires: 86400 * 1000 });
      // Cookies.set("userData", JSON.stringify(data.data), {
      //   expires: 86400 * 1000,
      // });
      localStorage.setItem('token', data.accessToken)

      setIsLoggedIn(true);
      createNotification(data.message, "success");

      return data.data;
    } catch (e) {
      alert(e.message);
    }
  };
  return { signup };
};

export default useSignupHook;
