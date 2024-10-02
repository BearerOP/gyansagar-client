"use client"

import * as React from "react"
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"

export default function CommandMenu({ open, setOpen, items }) {
  const navigate = useNavigate(); // Use React Router's useNavigate

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setOpen])

  const handleSelect = (item) => {
    setOpen(false)
    navigate(item.href); // Use navigate to redirect to the selected item's href
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} className="bg-primary shadow-lg rounded-lg">
      <CommandInput 
        placeholder="Type a command or search..." 
      />
      <CommandList>
        <CommandEmpty className="space-y-2 text-primary/50">No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {items.map((item) => (
            <CommandItem 
              className="flex items-center p-2 hover:bg-primary/10 transition-colors duration-200"
              key={item.name} 
              onSelect={() => handleSelect(item)}
            >
              <item.icon className="mr-2 h-4 w-4 text-primary/60" />
              <span className="text-primary/60">{item.name}</span>
              {item.shortcut && (
                <CommandShortcut className="text-primary/50">{item.shortcut}</CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
