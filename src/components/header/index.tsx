import Link from "next/link";
const Header = () => {
  return (
    <header className="text-center text-2xl pt-4" data-testid="header">
      <p>
        <Link href={"/"}>...:: SecTools ::...</Link>
      </p>
    </header>
  );
};

export default Header;
