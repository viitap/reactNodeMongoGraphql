data "archive_file" "lambda_process_archive_file" {
  type        = "zip"
  source_dir = "../src"
  output_path = "${var.builddir}/lambda.zip"
}
resource "aws_s3_bucket_object" "deploy_bucket" {
  bucket = "${var.s3_deploybucket}"
  key    = "${local.resource_prefix}/lambda.zip"
  source = "${var.builddir}/lambda.zip"
}

resource "aws_lambda_function" "lambda_function" {
  s3_bucket        = "${aws_s3_bucket_object.deploy_bucket.bucket}"
  s3_key           = "${aws_s3_bucket_object.deploy_bucket.key}"

  function_name = "${local.resource_prefix}_lambda"
  handler = "main.handler"
  runtime = "nodejs6.10"

  role = "${aws_iam_role.lambda_exec.arn}"
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "${local.resource_prefix}_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}


