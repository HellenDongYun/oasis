import Logo from "./Logo";
import Navs from "./Navs";

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navs />
      </div>
    </header>
  );
}

export default Header;
