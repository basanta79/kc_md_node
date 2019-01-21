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

---

## Instrucciones de arranque

### Inicializar una base de datos
Ejecutar el script initdb para inicializar la base de datos. Se elimina todo lo que contenga y se carga con documentos iniciales que se encentran en ./data/initAnuncios.json
```shell
npm run initdb
```

### Encender el servidor de la base de datos.
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

---

## Filtrado de anuncios
Se listan todos los anuncios, con paginación y se pueden especificar una serie de filtros. Estos filtros son igualmente aplicables a la interface web como a la API REST. 
los posibles filtros a aplicar se explican a continuación:


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

---

## Interface WEB
La direccion para listar los anuncios por web es: http://127.0.0.1:3000/anuncios

Un ejemplo de llamada empleando todos los filtros es:
http://127.0.0.1:3000/apiv1/anuncios?venta=false&nombre=bici&precio=600-701&skip=0&limit=2&sort=precio&tags=health%20home

---

## Interface API

### Listado de anuncios
La direccion de la api para obtener un objeto JSON con los anuncios es:
http://127.0.0.1:3000/apiv1/anuncios

Los parametros de los filtros se enviarán mediante parametros en el header urlencoded.

### Listado de tags
Los tags es un Array que solo puede contener strings predefinidos. Para obtener un array con todos los valores permitidos se puede obtener mediante una llamada GET a la siguiente dirección:
http://127.0.0.1:3000/apiv1/anuncios/taglist
Un ejemplo del objeto que devolverá es:
```JSON
{
    "sucess": "true",
    "tags": [
        "health",
        "home",
        "lifestyle",
        "work",
        "motor",
        "mobile"
    ]
}
```

### Creación de un anuncio
Para la creación de un anuncio enviaremos una llamada por método POST y con los campos del anuncio a la siguiente dirección:
http://127.0.0.1:3000/apiv1/anuncios

Si todo está bien la respuesta será un objeto con un parametro success y el objeto que se ha creado con su ID. Por ejemplo:
```JSON
{
    "success": "true",
    "element": {
        "tags": [
            "health",
            "home",
            "lifestyle"
        ],
        "_id": "5c4647e07613bb29cc7534e9",
        "nombre": "tirita",
        "venta": true,
        "precio": 2.5,
        "foto": "http://mevesur.com/480-tm_large_default/tirita-plastico-redonda-curatina-caja-125-unidades.jpg",
        "__v": 0
    }
}
```

En caso de que la validación falle se recibirá un objeto JSON con el detalle del error. Por ejemplo, el sigueinte objeto es lo que se recibe en caso de que enviemos un tag que no pertenece a la lista
```JSON
{
    "sucess": "fasle",
    "description": {
        "errors": {
            "tags.2": {
                "message": "`injury` is not a valid enum value for path `tags`.",
                "name": "ValidatorError",
                "properties": {
                    "message": "`injury` is not a valid enum value for path `tags`.",
                    "type": "enum",
                    "enumValues": [
                        "health",
                        "home",
                        "lifestyle",
                        "work",
                        "motor",
                        "mobile"
                    ],
                    "path": "tags",
                    "value": "injury"
                },
                "kind": "enum",
                "path": "tags",
                "value": "injury"
            }
        },
        "_message": "Anuncio validation failed",
        "message": "Anuncio validation failed: tags.2: `injury` is not a valid enum value for path `tags`.",
        "name": "ValidationError"
    }
}
```
