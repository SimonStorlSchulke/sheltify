package shtypes

type Validatable interface {
	Validate() error
}
