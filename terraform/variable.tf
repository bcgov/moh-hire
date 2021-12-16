variable "project_code" {}
variable "lz2_project" {}
variable "api_artifact" {}
variable "app_sources" {}
variable "target_env" {}
variable "target_aws_account_id" {}
variable "domain" {}
variable "app_sources_bucket" {}

variable "function_memory_mb" {
  default = "2048"
}

variable "db_username" {}

variable "mail_from" {}

variable "ches_client_id" {}

variable "azs" {
  default = ["ca-central-1a", "ca-central-1b"]
}

variable "region" {
  default = "ca-central-1"
}
