import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (props.onClick != null) {
          props.onClick(e);
        }
      }}
      disabled={props.disabled}
      className="px-5 py-2 border-2 border-emerald-100 rounded-md
    bg-emerald-50 hover:bg-emerald-100
    cursor-pointer disabled:cursor-not-allowed
    transition-colors text-gray-950
    disabled:bg-gray-100 disabled:border-gray-200"
    >
      {props.children}
    </button>
  );
}
