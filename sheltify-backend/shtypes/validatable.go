package shtypes

type Validatable interface {
	Validate() error
	SetTenantId(id string)
}
