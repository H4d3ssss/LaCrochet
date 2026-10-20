import LoginForm from "../components/auth/LoginForm";

export default function AuthPage() {
  return (
    <main className="relative mx-auto min-h-screen w-95% max-w-900px overflow-hidden rounded-40px bg-[#D7BDB0] flex flex-row justify-between">
  
      <div className="relative z-10 max-w-1/2 mx-12 align-center my-auto">
        <LoginForm />
      </div>

      <div className="relative z-10 max-w-1/2 bg-amber-400 mx-auto my-auto">
      </div>

      <div className="absolute -left-[35%] -top-[25%] h-[150%] w-[80%] rounded-[50%] bg-white z-0" />
    </main>
  );
}
