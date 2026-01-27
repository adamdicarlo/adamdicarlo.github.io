#!/usr/bin/env bash
set -e

SYSTEM=$(uname -m)
mkdir .bin
curl -L https://github.com/DavHau/nix-portable/releases/latest/download/nix-portable-"${SYSTEM}" >.bin/nix
chmod +x .bin/nix
ln -s "${PWD}/.bin/nix" .bin/nix-store
ln -s "${PWD}/.bin/nix" .bin/nix-shell
export PATH=$PWD/.bin:$PATH

NP_GIT=$(which git)
export NP_GIT

# https://github.com/DavHau/nix-portable/issues/138
export NP_RUNTIME=bwrap
nix-shell -p devenv --run "devenv shell build"
