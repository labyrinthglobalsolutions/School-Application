import React, { useCallback, useEffect, useState } from "react";

// import { User } from "./User"; // component display user (see detail on /example directory)
import { LoginSocialGoogle } from "reactjs-social-login";
import { useNavigate } from "react-router-dom";

// CUSTOMIZE ANY UI BUTTON
import { GoogleLoginButton } from "react-social-login-buttons";

// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
// const REDIRECT_URI = window.location.href;

const GoogleLogin = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  // const onLogoutSuccess = useCallback(() => {
  //   setProfile(null);
  //   setProvider("");
  //   alert("logout success");
  // }, []);

  useEffect(() => {
    if (profile && provider) {
      handleRedirect("/", { profile, provider });
    }
  }, [profile, provider]);

  const handleRedirect = (url, { provider, profile }) => {
    navigate(url, { state: { profile, provider } });
  };

  return (
    // <>
    //   {" "}
    //   {provider && profile ? (
    //     <AdminPanel
    //       provider={provider}
    //       profile={profile}
    //       onLogout={onLogoutSuccess}
    //     />
    //   ) : (
    <div className={`App ${provider && profile ? "hide" : ""}`}>
      <LoginSocialGoogle
        isOnlyGetCode={true}
        client_id={
          process.env.REACT_APP_GG_APP_ID ||
          "18984899539-7jarek3fqkubuupkscu0o6a0illrb60j.apps.googleusercontent.com"
        }
        onLoginStart={onLoginStart}
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {}}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
    </div>
    //     )}
    //   </>
  );
};

export default GoogleLogin;
