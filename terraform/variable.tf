variable "project_code" {}
variable "api_artifact" {}
variable "app_sources" {}
variable "target_env" {}
variable "domain" {}
variable "app_sources_bucket" {}

variable "function_memory_mb" {
  default = "2048"
}

variable "region" {
  default = "ca-central-1"
}
