
CLIENT_DIR=frontend

install-client:
	@echo "Installing client dependencies..."
	cd $(CLIENT_DIR) && npm install 

install-server:
	@echo "Installing server dependencies..."
	npm install

install: install-client install-server

build:
	@echo "Building client app..."
	cd $(CLIENT_DIR) && npm run build

start:
	@echo "Starting the app..."
	cd $(CLIENT_DIR) && npx start-server -s ./dist

local:
	@echo "Running app in local development mode..."
	cd $(CLIENT_DIR) && npm run dev