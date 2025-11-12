import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="w-full px-6 mb-4">
      <div className="bg-white/30 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/30 shadow-lg">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-foreground/60" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-foreground placeholder:text-foreground/60 w-full text-sm"
          />
        </div>
      </div>
    </div>
  );
};
