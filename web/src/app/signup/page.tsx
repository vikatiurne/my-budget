import Container from "@/components/containers/Container";
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import ReactQueryProvider from "@/components/containers/ReactQueryProvider";

const SignUpPage = () => {
  return (
    <ReactQueryProvider>
      <Container>
        <AuthForm typeAuth="signup" />
      </Container>
    </ReactQueryProvider>
  );
};

export default SignUpPage;
