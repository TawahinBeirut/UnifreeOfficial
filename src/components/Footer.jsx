const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full flex flex-row items-center justify-center mt-6 mb-2 opacity-40 text-sm">
      <p>©{currentYear} Unifree, IUT Lyon 1. No Rights Reserved.</p>
    </div>
  );
};

export default Footer;
