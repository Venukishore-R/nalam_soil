import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { LAND_UNITS } from "../utils/constants";
import { defaultLoginForm, defaultRegistrationForm } from "../constants/forms";
import { useLoginFlow } from "../hooks/useLoginFlow";
import { useRegistrationFlow } from "../hooks/useRegistrationFlow";

export default function FarmerAuthPage() {
  const registrationFlow = useRegistrationFlow();
  const navigate = useNavigate();
  const loginFlow = useLoginFlow();

  useEffect(() => {
    if (loginFlow.status.state === "success") {
      navigate("/home", { replace: true });
    }
  }, [loginFlow.status.state, navigate]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <HeroSection
        title="Register and login to Nalam soil"
        description="Capture the farmer's contact details, landholding size, and crop mix, then issue secure login credentials for future updates."
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-3xl border border-slate-200 px-4 py-2 text-xs font-semibold uppercase text-slate-600 transition hover:border-slate-400"
            >
              Registration only
            </Link>
            <Link
              to="/login"
              className="rounded-3xl border border-slate-200 px-4 py-2 text-xs font-semibold uppercase text-slate-600 transition hover:border-slate-400"
            >
              Login only
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <RegistrationForm
          form={registrationFlow.form}
          status={registrationFlow.status}
          landUnits={LAND_UNITS}
          initialValues={defaultRegistrationForm}
          onFinish={registrationFlow.handleFinish}
        />

        <LoginForm
          form={loginFlow.form}
          status={loginFlow.status}
          initialValues={defaultLoginForm}
          onFinish={loginFlow.handleFinish}
        />
      </div>
    </div>
  );
}
