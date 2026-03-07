import appLogo from "../assets/logo/logo.png";
export const LogoSideBar = () => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-rose-600 via-amber-600 to-orange-600 p-10 text-white">
      <div className="flex flex-col items-center justify-center rounded-[1.5rem]">
        <img
          src={appLogo}
          alt="App logo"
          className="w-[400] h-[400] !border object-contain"
        />
        {/* <p className="text-2xl font-semibold uppercase tracking-[0.45em]">
          Nalam Soil
        </p> */}
      </div>
    </div>
  );
};
