# Practica bootcamp web-VI

## Objetivos de la practica
- [X] - Desarrollar una api
  - [X] - Lista de anuncios paginada (skip y limit).
    - [X] - Lista de anuncios con filtros.
        - [X] - precio min y precio max
        - [X] - tipo de anuncio. (venta o busqueda)
        - [X] - lista de tags
        - [X] - Nombre del articulo (que empieze por)
    - [X] - Creación de un anuncio
    - [X] - Petición de listado de tags

- [X] - Desarrollar la interfaz web
  - [X] - Lista de anuncios paginada (skip y limit).
  - [X] - Lista de anuncios con filtros. Ejemplo: (http://localhost:3000/anuncios?start=1&limit=3&sort=name&tag=lifestyle)
    - [X] - precio min y precio max
    - [X] - tipo de anuncio. (venta o busqueda)
    - [X] - lista de tags
    - [X] - Nombre del articulo (que empieze por)


## Inicializar una base de datos
Ejecutar el script initdb para inicializar la base de datos. Se elimina todo lo que contenga y se carga con documentos iniciales que se encentran en ./data/initAnuncios.json
```shell
npm run initdb
```

## Encender el servidor de la base de datos.
Ejecutar el script startmongo para arrancar el servidor de la base de datos. Siempre que la instalación se encuentre en las siguientes rutas:
Ejecutable de la base de datos: C:/\"Program Files\"/MongoDB/Server/3.6/bin/mongod.exe 
Directorio de datos : C:/Users/basanta79/Documents/MongoData/db
```shell
npm run startmongo
```
Para ejecutar el shell y poder comunicarse directametne con el servidor
```shell
npm run startmongoshell
```
## Interface WEB

### Listados de anuncios

http://127.0.0.1:3000/anuncios

Con los siguientes parametros:

| nombre | tipo | descripción | Ejemplo 
|-|-|-|-|
| skip | numerico | número de anuncios que saltamos. | skip=2
| limit | numerico | número de anuncios que se visualizaran en pantalla | limit=25
| venta | booelano | true si el articulo se vente, false si se busca | venta=true
| nombre | texto | Se visualizaràn los anuncios cuyo nombre empiezen por este texto | nombre=bici 
| precio | numerico | Se devuelven los anuncios que cumplan con el criterio que se explica en el sigueinte apartado. | precio=100
| tags | array de texto | Se devolverán los anuncios que contengan alguna de las palabaras que se pasan, las palabras están separadas por un espacio | tags=home lifestyle
| sort | texto | Nombre del campo por el que ordenadar los anuncios que se visualizan. | sort=precio

### Filtro de Precio
| tipo de filtro | ejemplo |
|-|-|
| precio igual a | precio=100 |
| precio mayor que | precio=100- |
| precio menor que | precio=-100 |
| precio entre un valor y el siguiente | precio=100-200 |


