import express, { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../../../utils/express";
import {
  Client,
  AddressType,
  Language,
  PlacesNearbyRanking,
} from "@googlemaps/google-maps-services-js";
import { appConfig } from "../../../configs";
import { getPlaceInformation } from "../../../services/place-information";

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
        radius: 500,
        type: AddressType.tourist_attraction,
        language: Language.en,
        key: appConfig.googleMaps.apiKey,
        rankby: PlacesNearbyRanking.prominence,
      },
    });

    const place = response.data.results[0];
    console.log(place);
    if (!place || !place.name) {
      res.status(404).send("No nearby places found");
      return;
    }

    const summary = await getPlaceInformation(place.name);

    const singlePlace = {
      displayName: place.name,
      location: place.geometry?.location,
      photos: place.photos,
      formattedAddress: place.vicinity,
      summary,
    };

    // const places = response.data.results.slice(0, 1).map((place) => ({
    //   displayName: place.name,
    //   location: place.geometry?.location,
    //   photos: place.photos,
    //   formattedAddress: place.vicinity,
    // }));

    console.log(singlePlace);
    res.json(singlePlace);
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    res.status(500).send("Error fetching nearby places");
  }
});

recommendationsRouter.post("/", getRecommendations);
