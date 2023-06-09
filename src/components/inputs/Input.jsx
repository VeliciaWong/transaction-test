import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ className, prefix, affix, ...rest }, ref) => {
  return (
    <div className="flex w-full border rounded-lg bg-white">
      {prefix && (
        <div className="rounded-l-lg leading-10 px-4 bg-white text-black">
          {prefix}
        </div>
      )}
      <input
        ref={ref}
        className={[
          "py-2 px-4 w-full text-base text-black rounded-lg",
          className,
          prefix && "rounded-l-none pl-0",
          affix && "rounded-r-none pr-0",
        ]
          .join(" ")
          .trim()}
        {...rest}
      />
      {affix && (
        <div className="rounded-r-lg leading-10 px-4 bg-white text-black">
          {affix}
        </div>
      )}
    </div>
  );
});

export default Input;
