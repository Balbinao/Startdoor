import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export const FieldInput = forwardRef<HTMLInputElement, InputProps>(
  ({ iconLeft, iconRight, style, disabled, ...props }, ref) => (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {iconLeft && (
        <span className="absolute left-2.5 flex items-center">{iconLeft}</span>
      )}

      <input
        ref={ref}
        {...props}
        disabled={disabled}
        className={`h-10 w-full rounded-lg border border-(--grey-900) bg-(--grey-1100) text-3xl focus:ring-1 focus:ring-(--purple-400) focus:outline-none ${disabled ? 'input-disabled' : 'cursor-text'}`}
        style={{
          paddingLeft: iconLeft ? 44 : 12,
          paddingRight: iconRight ? 44 : 12,
          ...style,
        }}
      />

      {iconRight && (
        <span className="absolute right-2.5 flex items-center">
          {iconRight}
        </span>
      )}
    </div>
  ),
);
