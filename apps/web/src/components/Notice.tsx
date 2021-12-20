export const Notice: React.FC = ({ children }) => {
  const classes =
    'border-l-10 border-bcBluePrimary p-6 pb-5 md:pb-6 mb-5 bg-bcLightBackground text-left flex items-center';
  return (
    <div role='notice' className={classes}>
      {children}
    </div>
  );
};
