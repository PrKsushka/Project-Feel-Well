interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: any;
  favouriteRecipes?: any;
}
export default User;