import "./Input.scss";

interface InputProps {
  type: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
  touched?: boolean;
  error?: string;
  label?: string;
}

export const Input = ({
  type,
  placeholder,
  onChange,
  name,
  value,
  onBlur,
  touched,
  error,
  label,
  ariaLabel,
}: InputProps) => {
  return (
    <div className="input-div">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input"
        aria-label={ariaLabel}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        onBlur={onBlur}
      />
      {touched && error && <p className="error">{error}</p>}
    </div>
  );
};
