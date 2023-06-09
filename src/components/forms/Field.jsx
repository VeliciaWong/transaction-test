const Field = ({ children, label, error }) => {
  return (
    <div className="text-lg flex flex-col">
      <div className="mb-[10px] cursor-default">{label}</div>
      {children}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Field;
