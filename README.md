# Spotify Wrapped App

This is an express server that provides a set of endpoints for a Spotify Wrapped App. The app provides various functionalities to access and manipulate Spotify data through Spotify's Web API. The server is used by a React frontend.

## Installation

1. Clone the repository
2. Install dependencies using `npm install`

## Endpoints

### GET /user

This endpoint retrieves information about the authenticated Spotify user.

### GET /playlistitems

This endpoint retrieves the items (tracks and episodes) in a playlist owned by the authenticated user.

### GET /playlist

This endpoint retrieves a list of the playlists owned or followed by the authenticated user.

### POST /makeplaylist

This endpoint creates a playlist for the authenticated user.

### POST /add

This endpoint adds one or more tracks to a playlist owned by the authenticated user.

### GET /top

This endpoint retrieves the user's top artists and tracks based on calculated affinity.

### GET /recommendation

This endpoint retrieves a list of recommended tracks for the authenticated user.

### POST /recent

This endpoint retrieves the most recently played tracks for the authenticated user.

### GET /search

This endpoint searches for items that match a keyword string.

### DELETE /remove

This endpoint removes one or more items from a playlist owned by the authenticated user.

## Usage

1. Run `npm start` to start the server.
2. Ensure that the `REACT_APP_SPOTIFY_AUTH_ENDPOINT` environment variable in the React frontend points to the `/login` endpoint of the server.
3. Send requests to the endpoints described above using an HTTP client of your choice (e.g. Postman).
4. Use the React frontend to interact with the server and display the results.


