# zero-gas-CrowdSale-frontend

## start project

```sh
    nvm use
```

```sh
    yarn start
```

## deploy

```sh
yarn build
zip -r build.zip build
scp -i ~/0gas build.zip frontend@3.90.216.37:~/
ssh -i ~/0gas frontend@3.90.216.37

rm -rf /var/www/frontend/* build
unzip build.zip
cp -r build/* /var/www/frontend
```
