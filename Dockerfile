FROM node:14

RUN apt-get update \
	&& apt-get install -y \
	build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
	make

WORKDIR /app

COPY ./package.json ./

RUN npm install canvas --build-from-source
RUN npm install --prod

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD ["node","dist/app.js"]
