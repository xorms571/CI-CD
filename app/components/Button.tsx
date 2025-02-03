interface props {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: props) => {
  return (
    <button onClick={onClick} data-testid="custom-button">
      {label}
    </button>
  );
};

export default Button;
