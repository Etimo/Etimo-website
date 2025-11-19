import { CfRichText } from '@/app/lib/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import FadeIn from '../animations/FadeIn';

export const RichText = ({ doc }: { doc: CfRichText }) => {
  const richTextDoc = doc?.json ?? doc;
  if (!richTextDoc?.content) return null;

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: unknown, children: React.ReactNode) => (
        <FadeIn direction="right">
          <p className="mb-4 leading-relaxed text-sm 2xl:text-base">{children}</p>
        </FadeIn>
      ),
    },
  };

  return <div className="max-w-2xl mx-auto">{documentToReactComponents(richTextDoc, options)}</div>;
};
