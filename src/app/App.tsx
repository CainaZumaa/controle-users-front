"use client";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SpaceLogin from "../components/SpaceLogin";
import { GOOGLE_CONFIG } from "../config/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CONFIG.CLIENT_ID}>
      <SpaceLogin />
    </GoogleOAuthProvider>
  );
};

export default App;
