resource "aws_lambda_function" "cron" {
  description      = "API for ${local.namespace}"
  function_name    = local.cron_name
  role             = aws_iam_role.lambda.arn
  runtime          = "nodejs14.x"
  filename         = var.api_artifact
  source_code_hash = filebase64sha256(var.api_artifact)
  handler          = "api/cron.handler"
  memory_size      = var.function_memory_mb
  timeout          = 30

  vpc_config {
    security_group_ids = [data.aws_security_group.app.id]
    subnet_ids         = data.aws_subnets.app.ids
  }

  lifecycle {
    ignore_changes = [
      # Ignore changes to tags, e.g. because a management agent
      # updates these based on some ruleset managed elsewhere.
      filename,
      source_code_hash,
      source_code_size,
      last_modified,
    ]
  }
  environment {
    variables = {
      TARGET_ENV               = var.target_env
      NODE_ENV                 = "production"
      AWS_S3_REGION            = var.region
      RUNTIME_ENV              = "hosted"
      POSTGRES_HOST            = aws_rds_cluster.pgsql.endpoint
      POSTGRES_DATABASE        = aws_rds_cluster.pgsql.database_name
      POSTGRES_PASSWORD        = data.aws_ssm_parameter.postgres_password.value
      POSTGRES_USERNAME        = var.db_username
      CHES_CLIENT_ID           = var.ches_client_id
      CHES_CLIENT_SECRET       = data.aws_ssm_parameter.ches_client_secret.value
      CHES_SERVICE_HOST        = data.aws_ssm_parameter.ches_service_host.value
      CHES_AUTH_URL            = data.aws_ssm_parameter.ches_auth_url.value
      MAIL_FROM                = var.mail_from
      BUILD_ID                 = var.build_id
      BUILD_INFO               = var.build_info
      SLACK_ALERTS_WEBHOOK_URL = data.aws_ssm_parameter.slack_alerts_webhook_url.value
      MAIL_RECIPIENTS          = data.aws_ssm_parameter.mail_recipients.value
    }
  }
}

# Scheduler to sync master tables
resource "aws_cloudwatch_event_rule" "extract" {
  name                = local.extract_scheduler
  description         = "2:00PM UTC - 7:00AM PST on every Monday"
  schedule_expression = "cron(0 14 ? * MON *)"
}

resource "aws_cloudwatch_event_target" "extract" {
  rule  = aws_cloudwatch_event_rule.extract.name
  arn   = aws_lambda_function.cron.arn
  input = "{\"task\": \"extract\"}"
}

resource "aws_lambda_permission" "extract" {
  statement_id  = "AllowExecutionFromCloudWatch_Morning"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cron.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.extract.arn
}
