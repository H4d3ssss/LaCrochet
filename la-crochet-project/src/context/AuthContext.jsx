import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { fetchMe, loginUser } from "../api/auth";

const AuthContext = createContext(null);
const TOKEN_KEY = "lacrochet-token";

// "Remember me" → localStorage (survives closing the browser).
// Otherwise → sessionStorage (forgotten when the browser closes).
function readSavedToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function forgetToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage unavailable (e.g. private mode); nothing to clear.
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readSavedToken);
  const [user, setUser] = useState(null);
  // True while we check a saved login when the site first opens.
  const [isChecking, setIsChecking] = useState(() => Boolean(readSavedToken()));

  // A login popup any page can open (e.g. when a guest clicks "Add to Cart"),
  // plus something to do once they've logged in.
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const afterLoginRef = useRef(null);

  const requestLogin = useCallback((afterLogin = null) => {
    afterLoginRef.current = afterLogin;
    setLoginPromptOpen(true);
  }, []);

  const closeLoginPrompt = useCallback(() => {
    afterLoginRef.current = null; // closed without logging in: forget it
    setLoginPromptOpen(false);
  }, []);

  const logout = useCallback(() => {
    forgetToken();
    setToken(null);
    setUser(null);
  }, []);

  // When the site opens with a saved login, ask the server who it belongs to.
  useEffect(() => {
    if (!token) {
      setIsChecking(false);
      return;
    }

    let ignore = false;
    fetchMe(token)
      .then((profile) => {
        if (!ignore) setUser(profile);
      })
      .catch((error) => {
        // Expired or invalid login: log out. (A network hiccup keeps it.)
        if (!ignore && error.status === 401) logout();
      })
      .finally(() => {
        if (!ignore) setIsChecking(false);
      });

    return () => {
      ignore = true;
    };
  }, [token, logout]);

  async function login(email, password, rememberMe = false) {
    const result = await loginUser(email, password, rememberMe);

    forgetToken();
    try {
      (rememberMe ? localStorage : sessionStorage).setItem(TOKEN_KEY, result.access_token);
    } catch {
      // Storage unavailable: stay logged in until the page is refreshed.
    }

    setUser(result.user);
    setToken(result.access_token);

    // Finish what they were doing before we asked them to log in.
    const afterLogin = afterLoginRef.current;
    afterLoginRef.current = null;
    afterLogin?.();

    return result.user;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isChecking,
        login,
        logout,
        loginPromptOpen,
        requestLogin,
        closeLoginPrompt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
