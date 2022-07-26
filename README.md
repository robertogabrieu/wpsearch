# Instalar o NodeJS
curl -s https://deb.nodesource.com/setup_16.x | sudo bash
sudo apt install nodejs
sudo apt install npm

# Instalar o MongoDB
Configure a instalação do MongoDB
```
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

Caso esteja no Ubuntu 22.04 estes comandos serão necessários
```
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.0g-2ubuntu4_amd64.deb
sudo dpkg -i ./libssl1.1_1.1.0g-2ubuntu4_amd64.deb
rm -i libssl1.1_1.1.0g-2ubuntu4_amd64.deb
```

Instale o MongoDB
```
sudo apt update
sudo apt install mongodb-org
sudo systemctl enable mongod
mongo
use wpsearch
```

# Instalar o Nodemon
```
sudo npm install -g nodemon
```

# Clonar o Repositório
```
git clone https://github.com/Roberto-G-Almeida/wpsearch.git
```

# Instale as dependências do Node
```
cd wpsearch/pesquisa-backend/
npm install
```

# Preencha as variáveis de ambiente
Crie o arquivo .env com base no exemplo contido no repositório, e o abra para edição
```
cp .env.example .env
nano .env
```
Insira o código abaixo
```
SECRET=MRd2021**a
FRONTEND_URL=http://localhost:3000
MONGO_URL=127.0.0.1:27017
```

# Inicie o projeto Node
```
nodemon app.js
```

# Instale as dependências do React
```
cd wpsearch/pesquisa-frontend/
npm install
```

# Preencha as variáveis de ambiente
Crie o arquivo .env com base no exemplo contido no repositório, e o abra para edição
```
cp .env.example .env
nano .env
```
Insira o código abaixo
```
BACKEND_URL=http://127.0.0.1:4000
```

# Inicie o projeto React
```
npm run install:clean
```