![image](readme-images/banner.jpg)

# PupWalk - A Dog Walking App

PupWalk is an App that aims to provide a solution to dog owners that cannot always find the time to walk their dogs as often as they deserve to be walked. At the same time, millions of people wish to have a dog, but their circumstances simply do not allow for that.

Through PupWalk, busy dog owners meet motivated dog lovers that offer their dog walking service to the public.

## Description

Not only does PupWalk function as platform for dog owners to meet dog walkers, but PupWalk aspires to provide this exchange of services in an ethical manner. Dog owners should not be allowed pay an hourly rate below minimum wage. On top of that, the entire payout will flow to the walkers in its entirety.

## Run it on your machine

1. Fork the [PupWalk respository](https://github.com/alexn62/Dog-Walking-App)
2. Clone your fork to your local machine using 
   
   ```$ git clone https://github.com/YOUR_USERNAME/Dog-Walking-App.git```

3. For authentication, please set up a firebase account and create a new project.
4. Enable login through email and password in your firebase auth dashboard.
5.  Navigate to the ```/client``` folder and create a ```.env``` following the ```.env.example``` setup. Please find the necessary values in your firebase config, accessible by visiting your firebase project settings.
6.  Set up a mongo server and add the connection secrets to your ```.env``` in the ```/server``` folder, once again following the ```.env.example``` blueprint.
7.  Run ```$ npm install``` from your ```/client``` folder and your ```/server``` folder.
8.  From your ```/server``` folder, run ```$ nodemon index.ts``` and from your ```/client``` folder run ```$ npm start```
9. Visit the respective url in your browser and click ```F12``` to bring up the dev tools. 
10. Set the layout to mobile or a similarly narrow screen size for a better experience.

## Tech Stack

### Backend
- NodeJS
- MongoDB
- Mongoose
- GraphQL
- Apollo Server
- TypeScript

### Frontend
- React
- Apollo Client
- Leaflet
- Tailwind
- TypeScript
