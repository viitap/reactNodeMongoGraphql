Setup local development environment
=======================

```
docker-compose up
```



Setup AWS backend
=================

1) prerequisite:

    * terraform (https://www.terraform.io/)

3) create a secret.tfvars -file in your home directory. do NOT add it under folder. Within that file, setup your aws credentials like this:
`
access_key = "foo"
secret_key = "bar"
`
If you don't have AWS access keys, you can create them from the aws console. Instructions: https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html

Build and run tests
-------------------


Use the build script to create the lambda packages and run all the tests:
```
cd aws_backend_terraform
./build.sh
```

Deploy to AWS
-------------

NOTE: It is good practice to commit and push your changes before deploying. That way, the version tag will allow tracing back the code revision that was actually deployed

1) In your terminal, go to ./terraform and run
`
terraform init
`

2) Choose a deployment target (prod for production, any other name for deploying a test environment)
`
terraform workspace create my_dev
`
or for a previously created workspace:
`
terraform workspace select my_dev
`

3) Use terraform apply to deploy the environment. Before confirming the terraform plan CAREFULLY CHECK the suggested changes. Don't say we did not warn you ;)
´
terraform apply --var-file=~/secret.tfvars
