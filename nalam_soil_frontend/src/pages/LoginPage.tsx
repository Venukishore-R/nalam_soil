import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { defaultLoginForm } from "../constants/forms";
import { useLoginFlow } from "../hooks/useLoginFlow";
import { LogoSideBar } from "../components/LogoSideBar";

export default function LoginPage() {
  const navigate = useNavigate();
  const { form, status, handleFinish } = useLoginFlow();

  useEffect(() => {
    if (status.state === "success") {
      navigate("/home", { replace: true });
    }
  }, [status.state, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-6 py-10">
      <div className="w-full max-w-[940px] rounded-[1.5rem] border border-white/60 bg-white/80  backdrop-blur-lg">
        <div className="grid min-h-[28rem] grid-cols-1 overflow-hidden rounded-[1.25rem] bg-white  md:grid-cols-[1.05fr_1fr]">
          <LogoSideBar />

          <div className="flex flex-col gap-6 rounded-[1.5rem] bg-white p-8 md:p-12">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-slate-900">Log in</h1>
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-slate-900 underline"
                >
                  Create an account
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <LoginForm
                form={form}
                status={status}
                initialValues={defaultLoginForm}
                onFinish={handleFinish}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
