import Container from "@/components/containers/Container";
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import ReactQueryProvider from "@/components/containers/ReactQueryProvider";

const SignInPage: React.FC = () => {
  return (
    <ReactQueryProvider>
      <Container>
        <AuthForm typeAuth="signin" />
      </Container>
    </ReactQueryProvider>
  );
};

export default SignInPage;
