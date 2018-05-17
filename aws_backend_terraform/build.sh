#!/bin/sh
set -e

rm -rf _build
mkdir _build

version=$(git describe --tags --long --always)
echo ">>> Building version: $version"
echo "$version" > _build/version.info

# TODO: create zip, remove from terraform's responsibility
echo ""
echo ""
echo "Build successfull! (⌐■_■)"
echo ""
echo "Deploy instuctions:"
echo " 1) goto ./terraform"
echo " 2) do terraform init"
echo " 3) make sure you are on the right workspace ! (terraform.io/docs/commands/workspace)" 
echo " 4) terraform apply (carefully check changes before approving the deploy)"
echo ""
