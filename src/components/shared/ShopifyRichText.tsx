import { cn } from '@/lib/utils';
import React from 'react';

type RichTextNode = {
  type: string;
  value?: string;
  bold?: boolean;
  italic?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: RichTextNode[];
};

interface ShopifyRichTextProps {
  data: string | object;
  className?: string;
}

export function ShopifyRichText({ data, className }: ShopifyRichTextProps) {
  if (!data) return null;

  if (typeof data === 'string') {
    if (data.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(data);
        return <RenderNodes nodes={parsed.children} className={className} />;
      } catch (err) {
        console.error('Error parsing Rich Text JSON:', err);
        return (
          <div
            className={className}
            dangerouslySetInnerHTML={{ __html: data }}
          />
        );
      }
    }
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: data }} />
    );
  }

  if ('children' in data) {
    // @ts-expect-error -- casting untyped children
    return <RenderNodes nodes={data.children} className={className} />;
  }

  return null;
}

function RenderNodes({
  nodes,
  className,
}: {
  nodes: RichTextNode[];
  className?: string;
}) {
  if (!nodes) return null;

  return (
    <div
      className={cn(
        'space-y-4 font-text text-[#3E2723] prose-strong:text-[#737b4c]',
        className
      )}
    >
      {nodes.map((node, i) => {
        if (node.type === 'heading') {
          const Tag = `h${node.level}` as keyof React.JSX.IntrinsicElements;

          const headingClasses = cn('font-title font-medium text-[#9d5035]', {
            'text-4xl md:text-5xl mb-6': node.level === 1,
            'text-3xl md:text-4xl mb-5': node.level === 2,
            'text-2xl md:text-3xl mb-4': node.level === 3,
            'text-xl md:text-2xl mb-3': node.level === 4,
            'text-lg md:text-xl mb-2': node.level === 5,
            'text-base md:text-lg mb-2 uppercase tracking-wide':
              node.level === 6,
          });

          return (
            <Tag key={i} className={headingClasses}>
              {node.children?.map((child, j) => (
                <RenderLeaf key={j} node={child} />
              ))}
            </Tag>
          );
        }

        if (node.type === 'paragraph') {
          return (
            <p key={i} className="leading-relaxed">
              {node.children?.map((child, j) => (
                <RenderLeaf key={j} node={child} />
              ))}
            </p>
          );
        }

        if (node.type === 'list') {
          const ListTag = 'ul';
          return (
            <ListTag key={i} className="list-disc pl-5 space-y-1 my-4">
              {node.children?.map((child, j) => (
                <RenderNodes key={j} nodes={[child]} />
              ))}
            </ListTag>
          );
        }

        if (node.type === 'list-item') {
          return (
            <li key={i}>
              {node.children?.map((child, j) => (
                <RenderLeaf key={j} node={child} />
              ))}
            </li>
          );
        }

        return null;
      })}
    </div>
  );
}

function RenderLeaf({ node }: { node: RichTextNode }) {
  if (!node.value) return null;

  let content: React.ReactNode = node.value;

  if (node.bold) content = <strong>{content}</strong>;
  if (node.italic) content = <em className="italic">{content}</em>;

  return <>{content}</>;
}
