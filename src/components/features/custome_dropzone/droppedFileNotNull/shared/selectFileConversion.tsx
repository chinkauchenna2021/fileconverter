import React, { useState, useReducer, useCallback } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { fetchSelectedFiletype } from "@/hooks/fetchSelectedFiletype";

interface ISelectButton {
onchange:(item:string)=>void


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

function SelectFileConversion({onchange}: ISelectButton) {
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
    onchange(item)
  };

  let returndata = fetchSelectedFiletype(value, fileSelcetionTypes);
  console.log(returndata);
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
          <div className="h-fit grid grid-cols-3 border-r">
            <div className="col-span-1 flex-col flex justify-center items-center">
              {conversionType.map((type, index) => (
                <div
                  onClick={() => selectFileType(type.value)}
                  key={index}
                  className={cn(
                    "w-full py-4 text-sm text-center hover:bg-slate-300"
                  )}
                >
                  {type.value}
                </div>
              ))}
            </div>
            <div className="col-span-2">
              <div className="flex flex-wrap scrollbararea">
                {fetchSelectedFiletype(value, fileSelcetionTypes)?.map(
                  (item, index) => {
                    return (
                      <div
                        onClick={() => selectedFormat(item, index)}
                        key={index}
                        className={cn(
                          "w-fit px-3 py-2 rounded-sm flex justify-center items-center h-fit bg-slate-50 text-sm hover:bg-slate-400 hover:text-white "
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
