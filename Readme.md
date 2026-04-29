# Ejercicio 2 Formulario (Ainhoa)

## Configuración del entorno

Como ya teníamos previamente instalado VSCode, con sus respectivos plugings e instalado WSL y DDEV, solo sería montar el proyecto

### Montar el proyecto

Para poder montar el proyecto, dentro de la ruta correspondiente donde tengo mi DDEV, realizado el comando 
> mkdir ejercicio2_AinhoaGomez

En mi caso le he puesto de nombre a la carpeta ejercicio1_AinhoaGomez

A continuación, he abierto VSCode, he pulsado sobre el botón "Open a remote Window", y he seleccionado las siguientes opciones:
- Connect to WSL using Distro...
- DDEV

Una vez se carge la ventana de WSL, abrimos la carpeta que hemos creado en el paso anterior, en mi caso es la carpeta ejercicio2_AinhoaGomez

Abrimos una nueva terminal en VSCode dentro de la carpeta que hemos abrierto y ejecutamos el sigueinte comando:
> ddev config

Lo primero que nos pide es el nombre del proyecto, yo le he puesto Pokedex. Después, nos pide el documento root del proyecto, siempre va a ser web. Especificamos la versión de drupal, en mi caso puse drupal11.

Después de configurar la carpeta, debemos ejecutar los siguientes comandos:
> ddev start

> ddev composer create "drupal/recommended-project"

### Instalación de Drupal en el proyecto

Ahora debemos volver a ejecutar uno de los dos comando siguientes:
> ddev start

>  ddev st

Para arrancar nuestro proyecto. Una vez arrancado, debemos pulsar sobre el enlace que nos aparece en la tabla, en la fila de web. Se nos abrirá en el navegador con la instalación de Drupal. En ella se configura el idioma, el correo, el nombre del administrador, el nombre del sitio, etc.

Y ya tendríamos nuestro proyecto instalado y configurado.

## Subir el proyecto a git

Para comenzar, he abierto GitHub con mi cuenta y he creado un nuevo repositorio para este ejercicio 1. Una vez que tengo el repositorio creado, nos volvemos a la terminal de VSCode del proyecto y realizamos los siguientes comandos:

> git init

> git add .

> git commit -m "Start project"

(O el texto que quieras ponerle al commit)

> git branch -M main

> git remote add origin url

Debemos de sustituir la url, por la url del repositorio de GitHub

> git push -u origin main

## Código

### Decisiones

He tenido que realizar un módulo personalizado para poder realizar las páginas del formulario, mis solicitudes y todas las solicitudes. Con este módulo personalizado he creado varias páginas dinámicas. Con php he realizado la gran mayoría de funciones como la de imprimir el formulario, validar e insertar los datos en la base de datos, y mostrar los resultados. Estos resultados se muestran ordenados por fecha descendentemente, es decir, la más reciente arriba y solo se te muestran tus solicitudes si estas en la página de "Mis solicitudes". Si eres administrador y estás en la página de "Solicitudes" vas a ver todas las solicitudes realizadas ordenadas exactamente igual, de manera descendete. 

He añadido mi propia librería js para asegurarme más a la hora de validar los datos, añadirle los eventos a los botones, añadir las estrellitas en la prioridad, los mensajes de error y éxito,  que el botón estuviera disabled hasta que no estuvieran todos los datos rellenos y validados, y el vaciar los datos tanto si hay error como si se insertan los datos correctamente en la base de datos. 

### Limitaciones

A diferencia del otro ejercicio, en este la única limitación que he encontrado es los conocimientos previos sobre Drupal. En mi caso Drupal es una tecnología nueva que estoy aprendiendo a usar entonces, del anterior ejercicio, sabía hacer el módulo personalizado pero, por ejemplo, el realizar una nueva tabla en la base de datos, o incluso insertar los datos en la base de datos son cosas que desconocía hasta ahora después de haber hecho el ejercicio. 
