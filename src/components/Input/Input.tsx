import './Input.scss';

interface InputProps {
  id?: string;
  type: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched?: boolean;
  error?: string;
  label?: string;
}

export const Input = ({
  id,
  type,
  placeholder,
  onChange,
  name,
  value,
  onBlur,
  touched,
  error,
  label,
}: InputProps) => {
  return (
    <div className="input-div">
      <label className="label" htmlFor={name}>{label}</label>
      <input className="input"
        id={id}
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
