import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useGetSchedule } from "@/http/schedule/get-schedule";

interface ScheduleFieldProps {
  value: number;
  onChange?: (_data: number) => void;
}

export default function ScheduleField({ value, onChange }: ScheduleFieldProps) {
  const [open, setOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const session = useSession();

  const { data } = useGetSchedule(session.data?.access_token as string, {
    enabled: session.status === "authenticated",
  });

  useEffect(() => {
    setSelectedSchedule(value);
  }, [value]);

  useEffect(() => {
    if (onChange && selectedSchedule !== null) {
      onChange(selectedSchedule);
    }
  }, [selectedSchedule, onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedSchedule
            ? data?.data.find((item) => item.id === selectedSchedule)
                ?.nama_matakuliah
            : "Pilih Mata Kuliah"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full font-poppins">
          <CommandInput
            placeholder="Pilih Mata Kuliah"
            className="h-9 w-full"
          />
          <CommandEmpty className="px-8 text-muted-foreground text-sm pt-2">
            Mata kuliah tidak ada, tambahkan terlebih dahulu!
          </CommandEmpty>
          <CommandGroup>
            <CommandList className="text-left">
              {data?.data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id.toString()}
                  className="text-left"
                  onSelect={(currentValue: string) => {
                    const selectedValue = Number(currentValue);
                    setSelectedSchedule(selectedValue);
                    setOpen(false);
                  }}
                >
                  {item.nama_matakuliah}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedSchedule === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
