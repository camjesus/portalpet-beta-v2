import { SigninView } from "@/components/signin/SigninView";
import { useSignin } from "@/features/account/hooks/useSignin";

export default function Signin() {
  const { loading, handleLogin } = useSignin();

  return <SigninView loading={loading} handleLogin={handleLogin} />;
}