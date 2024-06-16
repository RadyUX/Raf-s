import axios from "axios";



class AuthService {
    login(email: string, password: string) {
      return axios
        .post("http://localhost:8000/login", {
            email,
          password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        
        });
    }

    register(name: string, email: string, password: string){
        return axios.post("http://localhost:8000/create",{
            name,
            email,
            password
        })
    }
  
    logout() {
      localStorage.removeItem("user");
         return axios.post("http://localhost:8000/logout")
    }

    getCurrentUser(){
        const user = localStorage.getItem("user")
        if (user) return JSON.parse(user)
    }
  
  

  }
  
  export default new AuthService();