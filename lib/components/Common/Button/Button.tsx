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
      className={`sc:px-6 sc:bg-neutral-100 sc:py-3 sc:hover:bg-neutral-200 sc:cursor-pointer ${className || ''}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
