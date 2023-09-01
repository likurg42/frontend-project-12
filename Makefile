install:
	npm install

lint-frontend:
	make -C frontend lint

start-frontend:
	make -C frontend start

start-backend:
	make -C backend start

start:
	make start-backend & make start-frontend
