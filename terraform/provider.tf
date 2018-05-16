provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}

terraform {
  backend "s3" {
    bucket = "sysart.cfg"
    region = "eu-central-1"
    key    = "kalastuslupa/tf/state"
  }
}
