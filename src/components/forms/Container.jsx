import Button from "components/button/Button";

const FormContainer = ({ children, title }) => {
  return (
    <div className="px-10 gap-[2rem]">
      <div className="pb-1 mb-5 border-b border-white/70">
        <div className="text-3xl font-semibold">{title}</div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default FormContainer;
