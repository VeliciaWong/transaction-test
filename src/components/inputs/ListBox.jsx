import { Fragment, useState } from "react";

const { Listbox, Transition } = require("@headlessui/react");
const { ChevronDownIcon } = require("@heroicons/react/20/solid");

const ListBoxInput = ({
  value,
  options = [],
  onChange,
  labelProps,
  placeholder = "Select",
  ...rest
}) => {
  const [selectedPerson, setSelectedPerson] = useState(value);

  const handleOnChange = (value) => {
    setSelectedPerson(value);
    onChange?.(value);
  };

  return (
    <Listbox value={selectedPerson} onChange={handleOnChange} {...rest}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white text-black py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-base border">
          {value ? (
            value[labelProps || "name"]
          ) : (
            <span className="text-black/60">{placeholder}</span>
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option[labelProps || "name"]}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListBoxInput;
