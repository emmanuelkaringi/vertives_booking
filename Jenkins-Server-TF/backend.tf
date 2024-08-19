terraform {
  backend "s3" {
    bucket         = "vertivesbooking-bucket1"
    region         = "us-east-1"
    key            = "vertives_booking/Jenkins-Server-TF/terraform.tfstate"
    dynamodb_table = "Tf-Lock-Files"
    encrypt        = true
  }
  required_version = ">=0.13.0"
  required_providers {
    aws = {
      version = ">= 2.7.0"
      source  = "hashicorp/aws"
    }
  }
}