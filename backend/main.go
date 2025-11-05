package main

import (
	"fmt"
	"log"
	"net/http"
)

func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"status": "healthy", "service": "privacy-copilot-backend"}`)
}

func main() {
	// Entry point for backend service
	http.HandleFunc("/health", healthCheck)
	fmt.Println("Privacy Copilot Backend starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
