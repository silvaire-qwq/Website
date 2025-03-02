manage:
	sudo sh ./backend/manager.sh

build:
	pnpm docs:build

dev:
	sudo pnpm docs:dev

push:
	sudo git add .
	sudo git commit -m "Auto"
	sudo git push -uf origin main
