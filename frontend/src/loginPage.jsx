import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [session, setSession] = useState(null);

  const [verifying, setVerifying] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const type = params.get("type");

    if (token_hash) {
      setVerifying(true);
      supabase.auth
        .verifyOtp({ token_hash, type: type || "email" })
        .then(({ error }) => {
          if (error) setAuthError(error.message);
          else {
            setAuthSuccess(true);
            window.history.replaceState({}, document.title, "/");
          }
          setVerifying(false);
        });
    }

    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    alert(error ? (error.error_description || error.message) : "Check your email for the login link!");
    setLoading(false);
  };

  // 1) redirect when logged in
  if (session) return <Navigate to="/start" replace />;

  // 2) verifying UI
  if (verifying) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>Confirming your magic link...</p>
      </div>
    );
  }

  // 3) error UI
  if (authError) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✗ Authentication failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            setAuthError(null);
            window.history.replaceState({}, document.title, "/");
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  // 4) default: login form (THIS is what you were missing)
  return (
    <div>
      <h1>Login</h1>
      {authSuccess && <p>✓ Authentication successful! Loading session...</p>}
      <form onSubmit={handleLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <button disabled={loading}>
          {loading ? "Sending..." : "Send magic link"}
        </button>
      </form>
    </div>
  );
}
