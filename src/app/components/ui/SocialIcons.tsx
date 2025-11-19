import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <a
        href="https://github.com/etimo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Etimo på GitHub"
        className="text-white hover:text-gray-300"
        title="GitHub"
      >
        <FaGithub size={24} />
      </a>
      <a
        href="https://www.linkedin.com/company/etimo/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Etimo på LinkedIn"
        className="text-white hover:text-gray-300"
        title="LinkedIn"
      >
        <FaLinkedin size={24} />
      </a>
    </div>
  );
};
