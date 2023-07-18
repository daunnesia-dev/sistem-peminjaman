"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: React.HTMLAttributes<HTMLDivElement> | any) {
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //     from: undefined,
  //     to: undefined,
  // })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span className="text-xs">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd LLL y")} -{" "}
                    {format(date.to, "dd LLL y")}
                  </>
                ) : (
                  format(date.from, "dd LLL y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
