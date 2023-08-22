install:
	npm install

lint-frontend:
	make -C packages/frontend lint

start-frontend:
	make -C packages/frontend start

start-backend:
	make -C packages/backend start

start:
	make start-backend & make start-frontend
