# :round_pushpin: SpotWise

Tourist Guide:

SpotWise is a mobile application that uses the current location of the people who are using it and based on that, automatically displays relevant information on the screen regarding the place where they are, for example (historical information about a nearby church or historic building) using the Google Maps API and AI (artificial intelligence) to decide the most relevant site in the vicinity.

## Main Features

The user only needs to enter the application and allow the use of the current location and the application will automatically display relevant information about the current location:

* **Displays the name of a relevant nearby place:** The app shows the name of a nearby location based on your current position.

* **Displays a photo of the nearby place:** Each nearby location comes with an image, providing a visual representation of the place.

* **Provides a button to redirect to Google Maps:** A button allows users to open the selected location directly in Google Maps for further navigation.

* **Summarizes the location using an LLM:** The app fetches a short summary of the location by querying Wikipedia, leveraging a Large Language Model (LLM) to generate and display the most relevant information about the place.

* **Text-to-speech for the summary:** The app includes a button that reads out the summary using the device's built-in text-to-speech feature.

* **Voice selection menu:** A dropdown menu enables users to select or change the voice used for reading the summary, with options available based on the voices installed on the device.

## 🛠️ Tech stack

### Front End

- React
- React Native
- Expo Go to see the changes in real time
- CSS for styles

### Back End

- nodeJS & Express
- LangChain + Azure OpenAI for AI agents
- Typescript

## 🗂️ Project Structure

```
spotwise
├── client/ # React native applications
│ ├── components # components react native
│ ├── screens # Fetch data from the API
├── backend/ # Express server application
│ ├── src # Source code
```

## ⚙️ Setup

### Install dependencies 
```sh
cd client # For the frontend
npm install
```
```sh
cd server # For the backend
npm install
```

### Run app locally
#### - Backend

```sh
npm run dev # To run the backend in developer mode 
```

#### - Frontend
```sh
npx expo start --tunnel # To run the frontend in developer mode
```

### Run app in production
#### - Frontend
```sh
npx expo start
```
#### - Backend
```sh
npm run built
npm run start
```
#### - Backend with docker

1. For build the image that cotains the server

```sh
docker build -f ./build/Dockerfile -t spotwise-server .
```

2. to launch the container in docker

```sh
docker run --env-file ./.env -p 8000:3000 ghcr.io/fernandopidi/spotwise-server:latest
```

