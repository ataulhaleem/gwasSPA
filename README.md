# gwasSPA

# install minio server 
```sh
wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio_20230619195250.0.0_amd64.deb -O minio.deb
sudo dpkg -i minio.deb

start server 
minio server miniodb --address 'localhost'

```

# install minio client
```sh

curl https://dl.min.io/client/mc/release/linux-amd64/mc \
  --create-dirs \
  -o $HOME/minio-binaries/mc

chmod +x $HOME/minio-binaries/mc
export PATH=$PATH:$HOME/minio-binaries/
```

# start server 
```sh
minio server miniodb 

# localhost:9000
```

