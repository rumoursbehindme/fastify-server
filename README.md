
# Music-Player Server 🎵
Fastify the backend server for handling authentication details authorization and API handling.



## Setup source code 🚀

1. Clone repository

    ```bash
      git clone https://github.com/rumoursbehindme/fastify-server.git
    ```

2. Install packages
    ```bash
      Yarn install
    ```
## Setup Configurations 🔧 

* ### Go to below site
   #### 👉 [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
#
* ### Create an application with the name of your choice.
    * Take the redirect_uri from the source code - /config/client.INI file
    * And paste it into the redirect URI option.
    * Select web API SDK.
    * Create the application and go to settings
    * Take the client ID and client secret and replace them with the client.INI file's client ID and client secret


## Deployment 🚀 

* To deploy this project in development mode run :

  ```bash
    yarn dev
  ```
* To build javascript build run :
  ```bash
    yarn build
  ``` 
* To deploy the project in production mode run :
  ```bash
    yarn start
  ```
