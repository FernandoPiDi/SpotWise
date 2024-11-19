# SpotWise

Tourist Guide:

SpotWise is an app that uses the current location of the people who are using it and based on that, automatically displays relevant information on the screen regarding the place where they are, for example (historical information about a nearby church or historic building) using the Google Maps API and AI (artificial intelligence) to decide the most relevant site in the vicinity.

## MVP

The user only needs to enter the application and allow the use of the current location and the application will automatically display relevant information about the current location.

Features
Displays the name of a relevant nearby place: The app shows the name of a nearby location based on your current position.

Displays a photo of the nearby place: Each nearby location comes with an image, providing a visual representation of the place.

Provides a button to redirect to Google Maps: A button allows users to open the selected location directly in Google Maps for further navigation.

Summarizes the location using an LLM: The app fetches a short summary of the location by querying Wikipedia, leveraging a Large Language Model (LLM) to generate and display the most relevant information about the place.

Text-to-speech for the summary: The app includes a button that reads out the summary using the device's built-in text-to-speech feature.

Voice selection menu: A dropdown menu enables users to select or change the voice used for reading the summary, with options available based on the voices installed on the device.

## Tech stack

### Front End

- React
- React Native
- Expo Go to see the changes in real time
- CSS for styles

### Back End

- nodeJS & Express
- LangChain + Azure OpenAI for AI agents
- Typescript

## Project Structure

/spotwise/
├── backend/ # Express backend application
│ ├── src/ # Source code
└── client/ # React Native frontend application
│ ├── # Source code

# Setup

## Set Up Environment Variables

**Backend:** Create a new file named `.env` in the folder server of your project and add the following content:

- Copy `server/.env.dist` to `server/.env`
- Set the following required variables:

```env
    GOOGLE_MAPS_API_KEY=your_api_key
    AZURE_OPENAI_ENDPOINT=your_endpoint
    AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
    AZURE_OPENAI_KEY=your_api_key
    OPENAI_API_VERSION=2024-04-01-preview
```

**Frontend:** Create a new file named `.env` in the folder client of your project and add the following content:

- Copy `client/.env.dist` to `client/.env`
- Set the following required variables:

```env
    EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
    EXPO_PUBLIC_BACKEND_URL=http://localhost:3000
```

### Runnig the Frontend

```sh
npx expo start
```

### Running the Backend with npm

1. To install the dependencies

```sh
npm install
```

2. Run the project in developer mode

```sh
npm run dev
```

3. Run the project in production

```sh
npm run start
```

### Running the Backend with docker

1. Build the image that cotains the server

```sh
docker build -f ./build/Dockerfile -t spotwise-server .
```

2. Run the container of the server

```sh
docker run --env-file ./.env -p 8000:3000 ghcr.io//spotwise-server:latest
```
