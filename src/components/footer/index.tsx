const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="text-center text-xl" data-testid="footer">
      <p>Made with ❤️ {getYear()}</p>
    </footer>
  );
};

export default Footer;
