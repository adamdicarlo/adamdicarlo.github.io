#!/usr/bin/env bash
set -ex

SYSTEM=$(uname -m)
mkdir .bin
curl -L https://github.com/DavHau/nix-portable/releases/latest/download/nix-portable-"${SYSTEM}" >.bin/nix
chmod +x .bin/nix
ln -s .bin/nix .bin/nix-store
export PATH=$PWD/.bin:$PATH
echo --------------------
echo PATH=$PATH
ls -lah
echo --------------------
nix shell nixpkgs#{bashInteractive,devenv} -c bash -c "devenv shell build"
