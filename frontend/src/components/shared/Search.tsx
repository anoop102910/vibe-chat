"use client";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(e => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    if (value) {
      params.set("q", value);
    } else params.delete("q");

    replace(`${pathname}?${params.toString()}`);
  }, 300);
  
  return (
      <Input
        placeholder="Search..."
        type="search"
        onChange={handleSearch}
        defaultValue={searchParams.get("q")?.toString()}
      />
  );
}

export default SearchInput;
