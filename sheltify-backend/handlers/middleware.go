package handlers

import (
	"context"
	"net/http"
	"sheltify-new-backend/services"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := services.Authorize(r)

		if err != nil {
			http.Error(w, "Authorization Failed", http.StatusForbidden)
			return
		}

		ctx := context.WithValue(r.Context(), "user", user)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
