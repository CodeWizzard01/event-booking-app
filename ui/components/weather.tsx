import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import { Weather } from "@/graphql/generated/graphql";

function getWeatherIcon(icon: string) {
  return `http://openweathermap.org/img/wn/${icon}.png`;
}

function WeatherCard({ weather }: { weather: Weather }) {
  return (
    <Card id="weatherCard">
      <CardHeader>
        <CardTitle>Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography
          element="p"
          as="p"
        >{`Temperature: ${weather.temp}°C`}</Typography>
        <Typography
          element="p"
          as="p"
        >{`Feels Like: ${weather.feels_like}°C`}</Typography>
        <Typography
          element="p"
          as="p"
        >{`Condition: ${weather.main} - ${weather.description}`}</Typography>
        <Typography
          element="p"
          as="p"
        >{`Humidity: ${weather.humidity}%`}</Typography>
        <Typography
          element="p"
          as="p"
        >{`Wind: ${weather.windSpeed} m/s`}</Typography>
        <img
          src={getWeatherIcon(weather.icon)}
          alt="Weather Icon"
          style={{ width: "50px", height: "50px" }}
        />
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
