"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, X } from "lucide-react";
import * as React from "react";

interface MultiSelectFilterProps {
  title: string;
  options: { label: string; value: string; icon?: React.ReactNode }[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  className?: string;
}

export function MultiSelectFilter({
  title,
  options,
  selectedValues,
  onSelectionChange,
  className,
}: MultiSelectFilterProps) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "min-w-35 justify-between border-dashed hover:bg-accent/50",
            selectedValues.length > 0 && "border-primary/50 bg-primary/5",
            className,
          )}
        >
          <span className="flex items-center gap-2">
            {title}
            {selectedValues.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 rounded-full px-2 py-0 text-xs font-medium"
              >
                {selectedValues.length}
              </Badge>
            )}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-55 p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    {option.icon && (
                      <span className="mr-2 text-muted-foreground">
                        {option.icon}
                      </span>
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearAll}
                    className="justify-center text-center text-sm text-muted-foreground cursor-pointer"
                  >
                    Clear all
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface ActiveFiltersProps {
  categories: string[];
  priorities: string[];
  onRemoveCategory: (category: string) => void;
  onRemovePriority: (priority: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  categories,
  priorities,
  onRemoveCategory,
  onRemovePriority,
  onClearAll,
}: ActiveFiltersProps) {
  const hasFilters = categories.length > 0 || priorities.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {categories.map((category) => (
        <Badge
          key={category}
          variant="secondary"
          className="gap-1 pr-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          {category.replace(/_/g, " ")}
          <button
            onClick={() => onRemoveCategory(category)}
            className="ml-1 rounded-full p-0.5 hover:bg-blue-200"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {priorities.map((priority) => (
        <Badge
          key={priority}
          variant="secondary"
          className={cn(
            "gap-1 pr-1",
            priority === "URGENT" && "bg-red-50 text-red-700 hover:bg-red-100",
            priority === "HIGH" &&
              "bg-orange-50 text-orange-700 hover:bg-orange-100",
            priority === "MEDIUM" &&
              "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
            priority === "LOW" &&
              "bg-green-50 text-green-700 hover:bg-green-100",
          )}
        >
          {priority}
          <button
            onClick={() => onRemovePriority(priority)}
            className="ml-1 rounded-full p-0.5 hover:bg-black/10"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Separator orientation="vertical" className="h-4" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-7 text-xs text-muted-foreground hover:text-foreground"
      >
        Clear all
      </Button>
    </div>
  );
}
