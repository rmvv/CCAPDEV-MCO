# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# make sure you have docker and git installed
# make sure you also login to your docker
# replace the rainev with your docker account

### clone repository 
git clone https://github.com/rmvv/CCAPDEV-MCO.git

### pull latest
cd CCAPDEV-MCO
git pull

### build image
docker build --platform linux/amd64 . -t rainev/ccapdev-mc03-g3

### push image to docker hub
docker push rainev/ccapdev-mc03-g3

# deploy in render
