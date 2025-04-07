import Container from "@/components/containers/Container";
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import ReactQueryProvider from "@/components/containers/ReactQueryProvider";
import ProtectedRouter from "@/hoc/ProtectedRouter";

const SignUpPage = () => {
  return (
    <ProtectedRouter>
      <ReactQueryProvider>
        <Container>
          <AuthForm typeAuth="signup" />
        </Container>
      </ReactQueryProvider>
    </ProtectedRouter>
  );
};

export default SignUpPage;
