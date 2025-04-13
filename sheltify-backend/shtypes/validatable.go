package shtypes

type Validatable interface {
	Validate() string
	SetTenantId(id string)
}
