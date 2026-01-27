#!/usr/bin/env bash
set -ex

SYSTEM=$(uname -m)
mkdir .bin
curl -L https://github.com/DavHau/nix-portable/releases/latest/download/nix-portable-"${SYSTEM}" >.bin/nix
chmod +x .bin/nix
ln -s "${PWD}/.bin/nix" .bin/nix-store
ln -s "${PWD}/.bin/nix" .bin/nix-shell
export PATH=$PWD/.bin:$PATH

export NIX_STORE=$NETLIFY_CACHE_DIR
NP_GIT=$(which git)
export NP_GIT
nix-shell -p devenv --run "devenv shell build"
