# Those variables are extracted from build.assets/Makefile so they can be imported
# by other Makefiles
# These values may need to be updated in `dronegen/container_image_products.go` if
# they change here
BUILDBOX_VERSION ?= teleport15
BUILDBOX_BASE_NAME ?= public.ecr.aws/gravitational/teleport-buildbox

BUILDBOX = $(BUILDBOX_BASE_NAME):$(BUILDBOX_VERSION)
BUILDBOX_CENTOS7 = $(BUILDBOX_BASE_NAME)-centos7:$(BUILDBOX_VERSION)
BUILDBOX_CENTOS7_FIPS = $(BUILDBOX_BASE_NAME)-centos7-fips:$(BUILDBOX_VERSION)
BUILDBOX_ARM64 = $(BUILDBOX_BASE_NAME)-arm64:$(BUILDBOX_VERSION)
BUILDBOX_ARM = $(BUILDBOX_BASE_NAME)-arm:$(BUILDBOX_VERSION)
BUILDBOX_UI = $(BUILDBOX_BASE_NAME)-ui:$(BUILDBOX_VERSION)
BUILDBOX_CONNECT = $(BUILDBOX_BASE_NAME)-connect:$(BUILDBOX_VERSION)
BUILDBOX_CENTOS7_ASSETS = $(BUILDBOX_BASE_NAME)-centos7-assets:$(BUILDBOX_VERSION)

.PHONY:show-buildbox-base-image
show-buildbox-base-image:
	@echo "$(BUILDBOX)"

.PHONY:show-buildbox-centos7-image
show-buildbox-centos7-image:
	@echo "$(BUILDBOX_CENTOS7)"
