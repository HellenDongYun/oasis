import SignInButton from "@/components/SignInButton";

export const metadata = () => {
  return {
    title: "Login",
    description: "Login to access your guest area",
  };
};
export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}