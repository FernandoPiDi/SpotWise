import express, { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../../../utils/express";
import {
  Client,
  AddressType,
  Language,
} from "@googlemaps/google-maps-services-js";
import { appConfig } from "../../../configs/config";

export const recommendationsRouter = express.Router();

const recommendationRequestBody = z.object({
  lat: z.number(),
  lng: z.number(),
});

const getRecommendations = asyncHandler(async (req: Request, res: Response) => {
  const validation = recommendationRequestBody.safeParse(req.body);
  if (!validation.success) {
    res.status(400).send(validation.error.errors);
    return;
  }
  const { lat, lng } = validation.data;

  const client = new Client({});

  try {
    const response = await client.placesNearby({
      params: {
        location: { lat, lng },
        radius: 100,
        type: AddressType.tourist_attraction,
        language: Language.en,
        key: appConfig.googleMaps.apiKey,
      },
    });
    
    const places = response.data.results.slice(0, 5).map((place) => ({
      displayName: place.name,
      location: place.geometry?.location,
      photos: place.photos,
      formattedAddress: place.vicinity,
    }));

    console.log(places);
    res.json(places);
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    res.status(500).send("Error fetching nearby places");
  }
});

recommendationsRouter.post("/", getRecommendations);
