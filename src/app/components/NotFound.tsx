import { SectionTitle } from './ui/SectionTitle';
import '../globals.css';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6">
        <SectionTitle title="404 Page **Not Found**" />
        <p className="quest">
          The page you are looking for have been moved, removed or never existed.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
