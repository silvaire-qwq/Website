install:
	pnpm install --force

build:
	pnpm docs:build

dev:
	pnpm docs:dev

push:
	git add .
	git commit -m "Auto"
	git push -uf origin main
