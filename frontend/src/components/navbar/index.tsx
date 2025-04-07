import GithubRepo from './github-repo';
import PagesLinks from './pages-links';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <PagesLinks />
          <GithubRepo />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 