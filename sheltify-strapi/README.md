# Sheltify-Strapi

## Multi-Tenancy:
- alle nutzer müssen entsprechende rolle haben (herzenshunde-griechenland...), damit sie im adminpanel nur die eigenen einträge bearbeiten können
- alle Nutzer müssen als nutzernamen tenant (hhg / mft...) haben, dann wird frontend danach gefiltert
  - workaround - ich wwürde lieber nach rolle filtern, das geht aber nicht
- alle schemas müssen options.populateCreatorFields auf true gesetzt haben.
- get im frontend muss dann immer den param `filters[createdBy][username][$eq]=hhg` (für hhg bzw. Tenantname) anhängen
