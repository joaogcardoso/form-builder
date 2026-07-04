# Form Builder

Projeto fullstack com MySQL, backend Spring Boot e frontend React + Vite servido por Nginx.

## Executar com Docker Compose

Crie o arquivo local de ambiente a partir do exemplo:

```bash
cp .env.example .env
```

Revise os valores de `.env` antes de subir os servicos. Esse arquivo contem senhas e secrets locais e nao deve ser commitado.

Suba a aplicacao a partir da raiz:

```bash
docker compose up --build
```

Acessos esperados:

```txt
Frontend: http://localhost:5173
Backend:  http://localhost:8080
MySQL:    localhost:3306
```

## Parar os servicos

```bash
docker compose down
```

Para remover tambem o volume do MySQL, apagando os dados persistidos:

```bash
docker compose down -v
```

## Variaveis de ambiente

As variaveis sensiveis devem ficar apenas no `.env` local. O Compose exige `MYSQL_ROOT_PASSWORD`, `MYSQL_PASSWORD` e `JWT_SECRET` para evitar subir a aplicacao com credenciais implicitas.
