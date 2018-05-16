data "archive_file" "lambda_process_archive" {
  type        = "zip"
  source_dir = "./backend"
  output_path = "${var.builddir}/backend.zip"
}
resource "aws_s3_bucket_object" "kalastuslupa_lambda_bucket" {
  bucket = "${var.s3_deploybucket}"
  key    = "$(var.resource_prefix)/backend.zip"
  source = "${var.builddir}/backend.zip"
}

resource "aws_lambda_function" "kalastuslupa_lambda" {
  s3_bucket        = "${aws_s3_bucket_object.kalastuslupa_lambda_bucket.bucket}"
  s3_key           = "${aws_s3_bucket_object.kalastuslupa_lambda_bucket.key}"

  function_name = "${local.resource_prefix}_backend"

  # "main" is the filename within the zip file (main.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
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


