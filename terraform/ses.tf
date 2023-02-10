resource "aws_ses_domain_identity" "ses_domain" {
  domain = var.domain
}

resource "aws_ses_domain_mail_from" "mail_from" {
  domain           = aws_ses_domain_identity.ses_domain.domain
  mail_from_domain = "mail.${var.domain}"
}

resource "aws_ses_domain_dkim" "dkim" {
  domain = aws_ses_domain_identity.ses_domain.domain
}

 resource "aws_sesv2_dedicated_ip_pool" "pool" {
   pool_name = "ses_ip_pool"
 }

 resource "aws_sesv2_dedicated_ip_assignment" "ip" {
   ip                    = data.aws_ssm_parameter.ses_ip.value
   destination_pool_name = aws_sesv2_dedicated_ip_pool.pool.pool_name
 }

 resource "aws_sesv2_configuration_set" "config" {
   configuration_set_name = "ses_config_set"

   delivery_options {
     sending_pool_name = aws_sesv2_dedicated_ip_pool.pool.pool_name
   }
 }
