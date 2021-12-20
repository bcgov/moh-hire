import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ButtonProps {
  onClick?: () => void;
  variant: keyof typeof buttonColor;
  loading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

export const buttonColor: Record<string, string> = {
  primary: `border-transparent bg-bcBluePrimary text-white hover:bg-blue-800 focus:ring-blue-500`,
  secondary: `border-2 border-bcBluePrimary bg-white text-bcBluePrimary hover:bg-gray-100 focus:ring-blue-500`,
  outline: `border-2 border-bcBluePrimary bg-white hover:bg-gray-100 focus:ring-blue-500 py-3 px-8 w-full md:w-auto`,
};

export const buttonBase = `w-auto inline-flex justify-center items-center rounded 
  shadow-sm px-4 py-2 text-base font-bold focus:outline-none
  disabled:opacity-50
  focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:text-sm`;

export const Button: React.FC<ButtonProps> = props => {
  const { variant, type, children, disabled, loading, onClick } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        ${buttonColor[variant]}
        ${variant !== 'link' ? buttonBase : ''}
      `}
      disabled={disabled}
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className='h-5 w-5 animate-spin anim' />
      ) : (
        children
      )}
    </button>
  );
};
