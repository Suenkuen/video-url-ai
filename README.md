# URL to Video - AI Powered Video Generator

A web application that converts a URL into a video using the power of AI. Users can enter a URL, and the application will generate a video with relevant content from that URL.

## Features

- **Convert URLs to Videos**: Generate videos by entering any valid URL.
- **Random Video Samples**: Displays random video samples from the server.
- **Real-time Loading Messages**: Shows loading messages during video generation.
- **AI-Powered Processing**: Uses AI to process and analyze the URL content for video creation.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS for UI styling and components.
- **Backend**: (Assumed) API built with Node.js and Express, with endpoints for video creation and retrieval.
- **HTTP Client**: Axios for making API requests.

## Prerequisites

- **Node.js**: Ensure that Node.js is installed on your system.
- **Backend Server**: This project assumes that a backend server is running at `http://localhost:8080` with endpoints for:
  - `/samples` - to get sample videos
  - `/create-story?url=` - to start the video generation process
  - `/build-video?id=` - to build and return the final video

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-to-video.git
cd url-to-video
```

### 2. Install Dependencies

Use npm or yarn to install the project dependencies.
```bash
npm install
# or
yarn install
```

### 3. Start the Application

Start the application in development mode.
```bash
npm start
# or
yarn start
```
The application will run at http://localhost:3000 by default.

## Usage

	1.	Enter a valid URL in the input field.
	2.	Click Create Video to start the video generation process.
	3.	Observe the real-time loading messages as the video is generated.
	4.	Once the video is created, the page will automatically redirect to the generated video.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

***

Enjoy creating videos with the power of AI! 🎉
