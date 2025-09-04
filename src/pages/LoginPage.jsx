import LoginFormComponent from "../components/LoginFormComponent";

function LoginPage() {
  return (
    <div className="bg-red-950 h-screen">
      <div className="container mx-auto flex flex-col items-center gap-[20px] py-[20px] px-[16px]">
        <h2 className="text-2xl text-blue-600 font-semibold">Login</h2>
        <LoginFormComponent />
      </div>
    </div>
  );
}

export default LoginPage;
