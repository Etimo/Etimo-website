import FadeIn from '../animations/FadeIn';

export const SectionTitle = ({
  title,
  highlightColor = 'text-cyan',
}: {
  title?: string | null;
  highlightColor?: string;
}) => {
  if (!title) return;
  const renderTitle = () => {
    // Split by ** delimiters
    const parts = title.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      // Check if this part is wrapped in **
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the ** delimiters
        const text = part.slice(2, -2);
        return (
          <span key={index} className={highlightColor}>
            {text}
          </span>
        );
      }
      // Return regular text
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <h2 className="text-3xl md:text-5xl lg:text-4xl font-bold mb-8 leading-tight">
      <FadeIn direction="left">{renderTitle()}</FadeIn>
    </h2>
  );
};
