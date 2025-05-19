import Main from "@/components/Main";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";



export default async function HomePage() {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <Main />
    </>
  );
}
