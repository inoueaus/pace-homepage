FROM node
WORKDIR /app

RUN apt-get update
RUN apt-get install default-jre -y
RUN npm install -g firebase-tools

COPY .firebaserc firebase.json database.rules.json storage.rules /app/
COPY ./dump /app/dump

EXPOSE 9099 9000 5001 9199 4000

CMD [ "firebase", "emulators:start", "--import=./dump" ]
