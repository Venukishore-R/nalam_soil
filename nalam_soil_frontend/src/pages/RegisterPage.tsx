import { Link } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import { LAND_UNITS } from "../utils/constants";
import { defaultRegistrationForm } from "../constants/forms";
import { useRegistrationFlow } from "../hooks/useRegistrationFlow";
import { LogoSideBar } from "../components/LogoSideBar";

export default function RegisterPage() {
  const { form, status, handleFinish } = useRegistrationFlow();

  return (
    <div className="flex h-screen w-full items-center justify-center px-6 py-10">
      <div className="w-full max-w-[1240px] rounded-[1.25rem] border border-white/60 bg-white/80 backdrop-blur-lg">
        <div className="grid min-h-[32rem] grid-cols-1 overflow-hidden rounded-[1.5rem] bg-white  md:grid-cols-[1.05fr_1fr]">
          {/* <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-rose-900 via-amber-900 to-orange-800 p-10 text-white">
            <div className="flex flex-col items-center justify-center rounded-[1.5rem]  p-3">
              <img
                src={appLogo}
                alt="App logo"
                className="w-[400px] !border object-contain"
              />
              <p className="text-2xl font-semibold uppercase tracking-[0.45em]">
                Nalam Soil
              </p>
            </div>
          </div> */}

          <LogoSideBar />

          <div className="flex flex-col gap-6 rounded-[2.25rem] bg-white p-8 md:p-12">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-slate-900">
                Register
              </h1>
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-slate-900 underline"
                >
                  Log in
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <RegistrationForm
                form={form}
                status={status}
                landUnits={LAND_UNITS}
                initialValues={defaultRegistrationForm}
                onFinish={handleFinish}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
