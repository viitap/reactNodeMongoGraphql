variable "access_key" {}
variable "secret_key" {}
variable "account_id" {}

# default region for "everyting"
variable "region" {
  default = "eu-west-1"
}

# build variables
variable "builddir" {
  default = "../_build"
}

# Bucket to use for deploying lambda functions
variable "s3_deploybucket" {
  default = "sysart.deploy.eu-west-1"
}

variable "s3_deploybucket_region" {
  default = "eu-central-1"
}

locals {
  version = "${trimspace(file("${var.builddir}/version.info"))}"
  resource_prefix = "kalastuslupa_${terraform.workspace}"
}

