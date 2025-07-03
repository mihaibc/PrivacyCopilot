
# Terraform config for deploying frontend to Azure (static web app) or GCP (Cloud Run)

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "frontend" {
  name     = "privacycopilot-frontend-rg"
  location = "East US"
}

resource "azurerm_static_site" "frontend" {
  name                = "privacycopilot-frontend"
  resource_group_name = azurerm_resource_group.frontend.name
  location            = azurerm_resource_group.frontend.location
  sku_name            = "Free"
  app_location        = "."
  output_location     = "dist"
}

# GCP example (uncomment and configure if using GCP)
# provider "google" {
#   project = "your-gcp-project-id"
#   region  = "us-central1"
# }
# resource "google_cloud_run_service" "frontend" {
#   name     = "privacycopilot-frontend"
#   location = "us-central1"
#   template {
#     spec {
#       containers {
#         image = "gcr.io/your-gcp-project-id/frontend:latest"
#       }
#     }
#   }
#   traffics {
#     percent         = 100
#     latest_revision = true
#   }
# }
