import { FaLinkedin } from 'react-icons/fa';

export const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof FaLinkedin;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-black hover:opacity-80 transition-opacity"
  >
    <Icon size={30} />
  </a>
);
