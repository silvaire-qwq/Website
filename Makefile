build:
	pnpm install
	pnpm build

dev:
	pnpm dev

push:
	git add .
	git commit -am 'Auto'
	git push -uf origin main
