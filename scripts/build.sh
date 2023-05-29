#!/bin/sh
rm -rf wwwroot
parcel build --dist-dir wwwroot

rm -rf external
mkdir external

cd external
git clone --depth=1 https://github.com/adamdicarlo/elm-tangly
cd elm-tangly
yarn --frozen-lockfile
yarn build --public-url /elm-tangly
cp -au dist ../../wwwroot/elm-tangly
cd ..

git clone --depth=1 https://github.com/adamdicarlo/elm-wordy
cd elm-wordy
yarn --frozen-lockfile
yarn build
cp -au build ../../wwwroot/elm-wordy
