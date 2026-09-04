"use client"

import { PlusIcon, SendIcon, ImageIcon, FileTextIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupTextarea } from "../ui/input-group"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu"

export default function ChatComposer() {
  return (
    <InputGroup className="flex flex-col min-h-[80px] md:min-h-[100px]">
      <InputGroupTextarea placeholder="Describe your task" className="min-h-[48px] md:min-h-[58px] text-base md:text-lg placeholder:text-sm md:placeholder:text-[17px]" />
      <InputGroupAddon align="block-end" className="justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex size-8 md:size-9 items-center justify-center rounded-lg hover:bg-muted hover:text-foreground">
            <PlusIcon className="size-4 md:size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-sm md:text-base w-48 md:w-56">
            <DropdownMenuItem className="gap-3 py-1.5 md:py-2 text-sm md:text-base">
              <ImageIcon className="size-4 md:size-5" />
              Upload image
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-1.5 md:py-2 text-sm md:text-base">
              <FileTextIcon className="size-4 md:size-5" />
              Upload document
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="size-8 md:size-9">
          <SendIcon className="size-4 md:size-5" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
