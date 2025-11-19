'use client';

interface HamburgerButtonProps {
  isLoading?: boolean;
  menuOpen: boolean;
  onClick: () => void;
}

export function HamburgerButton({ isLoading = false, menuOpen, onClick }: HamburgerButtonProps) {
  return (
    <div className="bg-cyan/80 rounded-full p-2">
      <button
        onClick={onClick}
        disabled={isLoading}
        aria-expanded={menuOpen}
        aria-controls="mobile-drawer"
        aria-label="Toggle menu"
        className={`flex flex-col justify-center items-center w-10 h-10 space-y-1.5 group
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          transition-opacity duration-300`}
      >
        <span
          className={`h-0.5 w-6 bg-gray-800 transition-transform duration-300 ${
            menuOpen ? 'rotate-45 translate-y-2' : ''
          } ${isLoading ? 'animate-pulse' : ''}`}
        />
        <span
          className={`h-0.5 w-6 bg-gray-800 transition-transform duration-300 ${
            menuOpen ? 'opacity-0' : 'opacity-100'
          } ${isLoading ? 'animate-pulse' : ''}`}
        />
        <span
          className={`h-0.5 w-6 bg-gray-800 transition-transform duration-300 origin-center ${
            menuOpen ? '-rotate-45 -translate-y-0.5' : ''
          } ${isLoading ? 'animate-pulse' : ''}`}
        />
      </button>
    </div>
  );
}
