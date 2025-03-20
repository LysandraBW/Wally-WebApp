.PHONY: startApp startClient startServer

startApp:
	make -j 2 startServer startClient
	google-chrome --new-window http://localhost:8000

startClient:
	cd Client/src; npm run dev

startServer:
	cd Server/Server; npm run dev