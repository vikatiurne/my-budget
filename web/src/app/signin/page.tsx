import Container from "@/app/components/containers/Container";
import React from "react";
import AuthForm from "@/app/components/auth/AuthForm";
import ReactQueryProvider from "@/app/components/containers/ReactQueryProvider";
import ProtectedRouter from "@/app/hoc/ProtectedRouter";

const SignInPage: React.FC = () => {
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
