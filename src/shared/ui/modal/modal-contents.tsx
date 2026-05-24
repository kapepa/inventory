import { cn } from "@/shared/lib/utils";

interface ModalContentsProps {
  title?: string;
  children?: React.ReactNode
  className?: string,
}

export const ModalContents = ({ title, children, className }: ModalContentsProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};