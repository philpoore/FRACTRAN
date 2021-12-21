PORT=8000

run:
	@echo "Open browser and navigate to : http://127.0.0.1:$(PORT)/ for fractran demo.\n\n"
	python3 -m http.server $(PORT)