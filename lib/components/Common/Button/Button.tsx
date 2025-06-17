import '../../../style.css';

export interface ButtonProps {
  /** Additional CSS classes */
  className?: string;
  /** Section title */
  title: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
const Button = ({
  className,
  title,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`px-6 bg-neutral-100 py-3 hover:bg-neutral-200 cursor-pointer ${className || ''}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
