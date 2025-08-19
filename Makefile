build:
	pnpm install
	pnpm build

push:
	git add .
	git commit -am 'Auto'
	git push -uf origin main
