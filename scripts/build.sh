#!/usr/bin/env bash
if [[ -z "$DEVENV_ROOT" ]]; then
  exec devenv shell "$0"
fi
set -e

rm -rf wwwroot
bun x parcel build --dist-dir wwwroot

rm -rf external
mkdir external

(
  cd external
  git clone --depth=1 https://github.com/adamdicarlo/elm-tangly
  cd elm-tangly
  devenv shell build
  cp -au dist ../../wwwroot/elm-tangly
)

(
  cd external
  git clone --depth=1 https://github.com/adamdicarlo/elm-wordy
  cd elm-wordy
  devenv shell build
  cp -au dist ../../wwwroot/elm-wordy
)
