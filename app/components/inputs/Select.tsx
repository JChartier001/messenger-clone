import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import ReactSelect from "react-select";
interface SelectProps {
  disabled?: boolean;
  options: Record<string, any>[];
  register: UseFormRegister<FieldValues>;
  id: string;
  required?: boolean;

  label: string;
  value?: Record<string, any>
  onChange: (value: Record<string, any>) => void;
}

const Select: React.FC<SelectProps> = ({
  disabled,
  options,
  register,
  id,
  required,
  label,
  value,
  onChange

}) => {
  return( <div className="z-[100]">
    <label className='block text-sm font-medium leading-6 text-gray-900'>{label}</label>
    <div className="mt-2">
      <ReactSelect isDisabled={disabled} value={value} onChange={onChange} isMulti options={options} menuPortalTarget={document.body} styles={{menuPortal: (base) => ({
        ...base,
        zIndex: 9999
      })
      }}
        classNames={{
          control: () => 'text-sm'}}
      />

    </div>
  </div>)
};

export default Select;
