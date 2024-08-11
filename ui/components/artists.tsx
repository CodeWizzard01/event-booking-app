import { Artist } from "@/graphql/generated/graphql";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Typography from "@/components/ui/typography";

function Artists({ artists }: { artists: Artist[] }) {
  return (
    <Card id="artistsCard">
      <CardHeader>
        <CardTitle>Artists</CardTitle>
      </CardHeader>
      <CardContent>
        {artists.map((artist) => (
          <Card
            id={`artistCard-${artist.name}`}
            key={artist.name}
            className="m-2"
          >
            <div className="flex items-center flex-row">
              <Image
                src={artist.imageUrl}
                alt={artist.name}
                width={100}
                height={100}
                className="m-2"
              />
              <div>
                <Typography element="h3" as="h3">
                  {artist.name}
                </Typography>
                <Typography element="p" as="p">
                  {artist.bio}
                </Typography>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default Artists;
