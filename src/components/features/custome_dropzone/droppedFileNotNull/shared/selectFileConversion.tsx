import React, { useState, useReducer, useCallback, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { fetchSelectedFiletype } from "@/hooks/fetchSelectedFiletype";

interface ISelectButton {
  onchange: (item: string) => void;
}
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
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/libs/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type ISelectType = {
  image: string[];
  video: string[];
  audio: string[];
};

interface IFormat {}

function SelectFileConversion({ onchange }: ISelectButton) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("image");
  const [selectedInput, setSelectedInput] = useState<string>("...");
 
  

  const fileSelcetionTypes: ISelectType = {
    image: [
      "jpg",
      "jpeg",
      "png",
      "ico",
      "bmp",
      "gif",
      "svg",
      "tga",
      "tiff",
      "webp",
      "wbmp",
      "hdr/exr",
      "eps",
    ],
    video: ["mp4", "mov", "avi", "wmv", "avchd", "webm", "flv"],
    audio: ["wav", "pcm", "aiff", "mp3", "aac", "wma", "flac", "alac", "wma"],
  };

  const conversionType = [
    {
      value: "Images",
    },
    {
      value: "Videos",
    },
    {
      value: "Audio",
    },
  ];


 

  const selectFileType = (selectedType: string) => {
    setValue(selectedType.toLowerCase());
  };

  const selectedFormat = (item: string, index: number) => {
    setSelectedInput(item);
    onchange(item);
  
  
  };

  let returndata = fetchSelectedFiletype(value, fileSelcetionTypes);
 


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {selectedInput}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No Filetype Found.</CommandEmpty>
          <div className="h-fit grid gap-3 grid-cols-3 border-r py-2">
            <div className="col-span-1 flex-col flex gap-1 justify-center items-center">
              {conversionType.map((type, index) => (
                <div
                  onClick={() => selectFileType(type.value)}
                  key={index}
                  className={cn(
                    `w-full py-4 cursor-pointer text-sm text-center  hover:text-white hover:bg-blue-700 ${value.toLowerCase() === type.value.toLowerCase() ? "bg-blue-700 text-white" : "bg-slate-200"}`
                  )}
                >
                  {type.value}
                </div>
              ))}
            </div>
            <div className="col-span-2">
              <div className="flex flex-wrap gap-2 scrollbararea">
                {fetchSelectedFiletype(value, fileSelcetionTypes)?.map(
                  (item, index) => {
                    return (
                      <div
                        onClick={() => selectedFormat(item, index)}
                        key={index}
                        className={cn(
                          `w-fit px-3 py-2 cursor-pointer rounded-[0.1rem] flex justify-center items-center h-fit  hover:bg-blue-700 text-xs hover:text-white ${selectedInput === item ? "bg-blue-700 text-white" : "bg-slate-200 "}`
                        )}
                      >
                        {item.toUpperCase()}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SelectFileConversion;
