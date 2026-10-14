import { useEffect, useRef, useState } from "react";

interface Item {
  id: string;
  name: string;
}

interface Option extends Item {}

interface Props {
  items: Option[];
  value: Option[];
  onChange: (items: Option[]) => void;
  disabled?: boolean;
}

export default function MultiSelect({
  items,
  value,
  onChange,
  disabled,
}: Props) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const q = query.toLowerCase();

      const result = items.filter((item) =>
        item.name.toLowerCase().includes(q),
      );

      setFiltered(result);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, items]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (item: Item) => {
    const exists = value.some((s) => s.id === item.id);

    if (exists) {
      onChange(value.filter((s) => s.id !== item.id));
    } else {
      onChange([...value, item]);
    }
  };

  const removeItem = (id: string) => {
    onChange(value.filter((s) => s.id !== id));
  };

  const allFilteredSelected =
    filtered.length > 0 &&
    filtered.every((item) => value.some((v) => v.id === item.id));

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      onChange(value.filter((v) => !filtered.some((item) => item.id === v.id)));
    } else {
      const newItems = filtered.filter(
        (item) => !value.some((v) => v.id === item.id),
      );
      onChange([...value, ...newItems]);
    }
  };

  return (
    <div className="w-full">
      {value.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {value.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs"
            >
              {item.name}
              <span
                onClick={() => removeItem(item.id)}
                className="cursor-pointer text-muted-foreground hover:text-foreground"
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="relative" ref={wrapperRef}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Chọn sản phẩm..."
          disabled={disabled}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary disabled:opacity-60"
        />

        {open && !disabled && (
          <div className="absolute z-20 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-border bg-popover shadow-md">
            {filtered.length > 0 && (
              <div
                onClick={toggleSelectAll}
                className="flex cursor-pointer items-center gap-2 border-b border-border px-3 py-2 text-sm hover:bg-secondary"
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={allFilteredSelected}
                  className="h-4 w-4"
                />
                <span>
                  {allFilteredSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                </span>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground">
                Không có kết quả
              </div>
            ) : (
              filtered.map((item) => {
                const isSelected = value.some((v) => v.id === item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-secondary ${
                      isSelected ? "bg-secondary" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={isSelected}
                      className="h-4 w-4"
                    />
                    <span>{item.name}</span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
