# Budget App

Budget app developed for the [Alkemy](https://www.alkemy.org/) fullstack challenge using a Node backend (server for API, proxy, & routing) with a [React frontend](https://github.com/facebookincubator/create-react-app).

* 📐 [Design Points](#user-content-design-points)
* 🕺 [Demo](#user-content-demo)
* 💻 [Local Development](#user-content-local-development)

## Design Points

A combo of two npm projects, the backend server and the frontend UI. So there are two `package.json` configs and thereforce [two places to run `npm` commands](#user-content-local-development):

  1. [**Node server**](server/): [`./package.json`](package.json)
      * [deployed automatically](https://devcenter.heroku.com/categories/deployment) via heroku/nodejs buildpack
  2. [**React UI**](client/): [`client/package.json`](client/package.json)
      * generated by [create-react-app](https://github.com/facebookincubator/create-react-app)
      * deployed via `build` script in the Node server's [`./package.json`](package.json)
      * module cache configured by `cacheDirectories`

## Demo

[Demo deployment](https://serene-inlet-59029.herokuapp.com/)

## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
1. **React UI** in `client/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](client/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd client/

# Initial setup
npm install

# Start the server
npm start
```