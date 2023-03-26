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
}

export const Input = ({ id, type, placeholder, onChange, name, value, onBlur, touched, error }: InputProps) => {
  return (
    <>
      <input id={id} type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} onBlur={onBlur} />
      {touched && error && (
        <p>{error}</p>
      )}
    </>
  );
};