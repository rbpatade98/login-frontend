const FormWrapper = ({ children, onSubmit, className = '' }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-5 ${className}`}
      noValidate
    >
      {children}
    </form>
  );
};

export default FormWrapper;
