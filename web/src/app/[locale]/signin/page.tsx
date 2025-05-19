import AuthForm from "@/components/auth/AuthForm";
import Container from "@/components/containers/Container";
import ReactQueryProvider from "@/components/containers/ReactQueryProvider";
import ProtectedRouter from "@/hoc/ProtectedRouter";

import React from "react";

const SignInPage = () => {

  return (
    <ProtectedRouter>
      <ReactQueryProvider>
        <Container>
          <AuthForm typeAuth="signin" />
        </Container>
      </ReactQueryProvider>
    </ProtectedRouter>
  );
};

export default SignInPage;
