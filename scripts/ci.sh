#!/usr/bin/env bash
set -e

SYSTEM=$(uname -m)
curl -L https://github.com/DavHau/nix-portable/releases/latest/download/nix-portable-"${SYSTEM}" >./nix-portable
chmod +x ./nix-portable

nix bundle --bundler github:DavHau/nix-portable -o devenv ".#devShells.${SYSTEM}.default"
chmod +w ./devenv/bin/devenv ./devenv
./devenv/bin/devenv build
