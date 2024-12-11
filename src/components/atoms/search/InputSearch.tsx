import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Cari...",
  className,
}) => {
  return (
    <div className="flex items-center">
      <div className="h-full flex justify-center items-center h-9 rounded-l-lg border border-input border-r-0 bg-gray-200 px-3">
        <Search className="h-4 w-4" />
      </div>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full md:max-w-xs w-full border rounded-l-none rounded-r-lg px-4 py-2 focus:outline-none",
          className
        )}
      />
    </div>
  );
};
