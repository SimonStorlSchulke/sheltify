package handlers

import (
	"net/http"
	"sheltify-new-backend/services"
	"sheltify-new-backend/shtypes"
)

func Register(w http.ResponseWriter, r *http.Request) {
	userId := r.FormValue("username")
	password := r.FormValue("password")

	user := services.RegisterUser(w, userId, password)
	if user == nil {
		return
	}

	createdResponse(w, user)
}

func Login(w http.ResponseWriter, r *http.Request) {
	userId := r.FormValue("username")
	password := r.FormValue("password")

	user := services.Login(w, userId, password)

	if user == nil {
		return
	}
	okResponse(w, user)
}

func Logout(w http.ResponseWriter, r *http.Request) {

	user := userFromContext(w, r)

	if user == nil {
		return
	}

	services.Logout(w, user)

	emptyOkResponse(w)
}

func userFromContext(w http.ResponseWriter, r *http.Request) *shtypes.User {
	userValue := r.Context().Value("user")
	if userValue == nil {
		http.Error(w, "User not found in context", http.StatusUnauthorized)
		return nil
	}

	user, ok := userValue.(*shtypes.User)
	if !ok {
		http.Error(w, "Invalid user in context", http.StatusInternalServerError)
		return nil
	}
	return user
}
