terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

variable "project_name" {
  description = "Project name for Cloudflare Pages"
  type        = string
}

resource "cloudflare_r2_bucket" "opentofu-backend-bucket" {
  account_id = var.cloudflare_account_id
  name       = "${var.project_name}-opentofu-state"
}
