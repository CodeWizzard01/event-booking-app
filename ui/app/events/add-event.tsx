"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Artist, Venue } from "@/graphql/generated/graphql";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../../components/ui/multi-selector";
import { createEvent, getArtists, getVenues } from "@/app/events/actions";
import { useFormState } from "react-dom";
import Typography from "@/components/ui/typography";

export function AddEvent() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

  const initialState = {
    message: null,
    eventCreationSuccess: false,
    resetKey: null,
  };

  useEffect(() => {
    (async () => {
      const [venuesData, artists] = await Promise.all([
        getVenues(),
        getArtists(),
      ]);
      setVenues(venuesData);
      setArtists(artists);
    })();
  }, []);

  const [state, formAction] = useFormState(createEvent, initialState);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (state.eventCreationSuccess) {
      setOpen(false);
    }
  }, [state.eventCreationSuccess, state.resetKey]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            <Typography element="p" as="p" className="text-red-600">
              {state?.message}
            </Typography>
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                defaultValue=""
                name="name"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                defaultValue=""
                name="category"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Venue
              </Label>
              <Select name="venueId" required>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent id="venueId">
                  {venues.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>
                      {venue.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Artists
              </Label>
              <input
                type="hidden"
                value={selectedArtists}
                id="selectedArtists"
                name="selectedArtists"
              />
              <MultiSelector
                values={selectedArtists}
                onValuesChange={setSelectedArtists}
                loop
                className="max-w-xs"
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList className="h-64">
                    {artists.map((artist) => (
                      <MultiSelectorItem key={artist.id} value={artist.id}>
                        {artist.name}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image
            </Label>
            <Input
              id="imageUrl"
              defaultValue=""
              name="imageUrl"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 mt-5">
            <Label htmlFor="imageUrl" className="text-right">
              Event Date
            </Label>
            <Input
              id="eventDate"
              type="date"
              defaultValue=""
              name="eventDate"
              className="col-span-3"
              required
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              document.forms[0].requestSubmit();
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}