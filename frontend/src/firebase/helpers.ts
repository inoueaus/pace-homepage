import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./index";

export const checkAuthStatus = () =>
  new Promise<boolean>((resolve, reject) => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        unsubscribe();
        resolve(Boolean(user));
      },
      error => reject(error)
    );
  });
