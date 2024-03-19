# Merchant Sample App

Quick project created to demonstrate a simple merchant app that integrates with our payment gateway.

## How to run/install the project

1. Clone this repo
2. Install the dependencies with `npm install` on the project root directory
3. If installing on a remote machine, edit the src/components/Redirect.tsx and src/endpoints.ts, specify returnUrl and postbackUrl according to where you have installed the application, and what nginx port forwardings are used
4. Run the FE project from root with `npm run dev`
5. cd into `/backend` directory
6. Install the dependencies with `npm install`
7. Run the BE from `/backend` with `npm run start`
8. You can now open the project in port `:5173`

