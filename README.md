# Docker To Heroku Deploy - GitHub Action

Action to build, push and deploy containers to you Heroku app.

Original Author: [Jean Carlos Taveras](https://github.com/jctaveras)

Adapted by: [Techmmunity](https://github.com/Techmmunity)

## How to use it

```yml
name: "" #set whatevername you want to your github job
on: # set the events you would like to trigger this job
  push:
    branches: [master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Build, Push and Deploy to Heroku
        id: heroku
        uses: Techmmunity/docker-heroku-deploy@v1.0.0 # use the latest version of the action
        with:
          email: ${{ secrets.HEROKU_EMAIL }} # your heroku email
          api_key: ${{ secrets.HEROKU_API_KEY }} # your  heroku api key
          app_name: ${{ secrets.HEROKU_APP_NAME }} # you aplication name
          dockerfile_path: "." # OPTIONAL: set the path to the folder wher the Dokerfile is located, the default is the rootDir
          dockerfile_name: "." # OPTIONAL: Custom name to your dockerfile, like Dockerfile.dev
          options: "" # OPTIONAL: Docker Build Options
          formation: "web" # OPTIONAL: Docker Dyno Formation. By default is web
```
