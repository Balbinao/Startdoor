import type { Placement } from '@floating-ui/react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface MenuOption {
  text: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface MenuExtraOptionsProps {
  children: ReactNode;
  options: MenuOption[];
  placement?: Placement;
}

export const MenuExtraOptions = ({
  children,
  options,
  placement = 'bottom-start',
}: MenuExtraOptionsProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { x, y, strategy, refs, update } = useFloating({
    placement,
    middleware: [offset(8), flip(), shift({ padding: 16 })],
  });

  const handleToggle = () => setOpen(p => !p);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;

    if (refs.reference.current && refs.floating.current) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, refs.reference, refs.floating, update]);

  return (
    <div ref={wrapperRef} className="relative z-5">
      <div ref={node => refs.setReference(node)} onClick={handleToggle}>
        {children}
      </div>

      {open && (
        <ul
          ref={node => refs.setFloating(node)}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          className="min-w-20 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 whitespace-nowrap"
        >
          {options.map((option, idx) => (
            <li
              key={idx}
              className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-xs hover:bg-zinc-700/80"
              onClick={() => {
                option.onClick();
                setOpen(false);
              }}
            >
              {option.icon && <span>{option.icon}</span>}
              <span>{option.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
