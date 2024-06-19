export interface IUser {
    user: {
      name: string;
      email: string;
      password: string;
      avatar?: string;
    };
    isAdmin?: boolean; // Déclarez isAdmin comme une propriété optionnelle
  }
  
  export default IUser