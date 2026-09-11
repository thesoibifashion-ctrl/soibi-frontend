interface FormInputProps {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "password";
  textarea?: boolean;
  rows?: number;
}

const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea = false,
  rows = 4,
}: FormInputProps) => {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
        {label}
      </label>

      {textarea ? (
        <textarea
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          rows={rows}
          className="px-[10px] py-3 mt-3 text-sm bg-[#F3F3F6] rounded-[10px] w-full resize-none outline-none"
        />
      ) : (
        <input
          onChange={onChange}
          type={type}
          value={value}
          placeholder={placeholder}
          className="px-[10px] mt-3 h-12 text-sm bg-[#F3F3F6] rounded-[10px] w-full outline-none"
        />
      )}
    </div>
  );
};

export default FormInput;
