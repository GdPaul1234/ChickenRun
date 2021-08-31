# Challenge ChickenRun

## Création de la base de données
Ce projet utilise le SGBD PostgreSQL.

### Script de création de la table `Chicken`
```SQL
-- Table: public.chicken

-- DROP TABLE public.chicken;

CREATE TABLE public.chicken
(
    "chickenID" integer NOT NULL DEFAULT nextval('"chicken_chickenID_seq"'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    birthday timestamp without time zone,
    weight double precision NOT NULL,
    "isRunning" boolean DEFAULT false,
    steps integer DEFAULT 0,
    CONSTRAINT chicken_pkey PRIMARY KEY ("chickenID")
)

TABLESPACE pg_default;

ALTER TABLE public.chicken
    OWNER to postgres;

GRANT ALL ON TABLE public.chicken TO postgres;
```

## Lancer le programme

### Configuration des variables d'environement
Au préalable, il faut renseigner les identifiants de connexion à la base de données dans un fichier `.env`.

Voici un exemple de configuration:
```
DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=ultrasecurepwd
DB_DATABASE=ChickenRun
```

### Installation des dépendances
```
npm install
```

### Lancement du programme
```
npm start
```

## Utiliser le webservice `chicken`
Vous pouvez utiliser **Postman** pour faire vos requêtes API.

> NB:
> Le contenu des requêtes `POST`, `PUT` et `PATCH` sont à renseigner dans le **body** en tant que **x-www-form-urlencoded**.

