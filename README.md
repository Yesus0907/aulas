#
# AULA VIRTUAL

Aplicación WEB desarrollada con Angular.JS para cargar los cursos virtuales en CANVAS y MOODLE.

`<iframe>`

![](http://contenidos.areandina.edu.co/repo/aulavirtual/readmi/aulavirtual.png)

------------------------------------------------------------------------------------------------

## ENTORNO DE DESARRROLLO

* GIT
[DESCARGAR](https://git-scm.com/downloads)

* Node.js `v10.16.0`
[DESCARGAR](https://nodejs.org/es/)

* Sourcetree (Git client)
[DESCARGAR](https://www.sourcetreeapp.com/)

* Visual Studio Code
[DESCARGAR](https://code.visualstudio.com/Download)

------------------------------------------------------------------------------------------------

## PROYECTO

El proyecto se distribuye de la siguiente manera:

![project](http://contenidos.areandina.edu.co/repo/aulavirtual/readmi/project.png)

**/build**, es el directorio donde quedan los archivos finales después de compilar, estos archivos son los que se despliegan a producción.

**/development**, es el directorio principal de desarrollo y está compuesta por:

**/assets**

* **/css:** archivos CSS estáticos que se crean al compilar SCSS.
* **/fonts:** familias tipográficas corporativas e iconos usados en el Front.
* **/images:** contiene todas las imagens usadas en la interfaz y componentes.
* **/js:** core de la aplicación.
* **/scss:** archivos CSS con estilo de todos los componentes de la aplicación.
* **/views:** archivos HTML de todos los componentes de la aplicación.

**/referentes** 

* En este directorio se añaden las secciones que alimentan los diseñadores gráficos para crear un curso.

	Estos archivos son compilados por la aplicación al ingresar al navegador y permiten insertar etiquetas de HTML5 estandar y etiquetas personalizadas de la aplicación.
	
------------------------------------------------------------------------------------------------

## EJECUTAR ENTORNO DE DESARRROLLO

En el directorio raíz:

1. Ejecutar el comando `npm install`, para instalar las dependencias descritas en el ** package.json **.


2. Ejecutar el comando `npm run watch`, para compilar, escuchar los cambios en el puerto 8080 y abir el navegador.



**IMPORTANTE**

Los activos(/assets) de la aplicaciòn pueden ser obtenidos localmente y desde el servidor, es posible que deseé utilizarlos de manera local para visualizar los cambios en tiempo real o obtenerlos desde el servidor para observar la implementación en producción.

Para cambiar entre local y servidor ubique el archivo **./development/assets/js/app.js** y modifique el valor de la constante **apiUrl**.


* **LOCAL:**
`apiUrl: "./assets/"`

* **SERVIDOR:**
`apiUrl: 'https://contenidos.areandina.edu.co/repo/aulavirtual/assets/'`


![project](http://contenidos.areandina.edu.co/repo/aulavirtual/readmi/appdeve.png)

------------------------------------------------------------------------------------------------

## DESPLEGAR A PRODUCCIÓN

**IMPORTANTE**

Para cambiar entre local y servidor dirijase al archivo ./development/assets/js/app.js y modifique el valor de la constante apiUrl

* **SERVIDOR:**
`apiUrl: 'https://contenidos.areandina.edu.co/repo/aulavirtual/assets/'`

![project](http://contenidos.areandina.edu.co/repo/aulavirtual/readmi/approd.png)

## 1. COMPILAR

Ejecute `npm run compile`, para compilar y unificar los js, compilar scss, cambiar los  ** build ** donde se encuentran los archivos finales.

![project](http://contenidos.areandina.edu.co/repo/aulavirtual/readmi/dist.png)

## 2. DESPLEGAR

Reemplazar en la ruta principal `https://contenidos.areandina.edu.co/repo/aulavirtual`:

* assets
* referentes
* index.html

**IMPORTANTE**

No eliminar el archivo ** .htaccess **

![project](http://contenidos.areandina.edu.co/repo/aulavirtual/readmi/ftp.png)

------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------

## CONFIGURACIÓN DEL INDEX.HTML

El siguiente **script** sirve para dinamizar el número de Ejes o Módulos en un curso y elegir el LMS donde se implementará;

#
```javascript
	var config_global = {
		cant: 4, 
		type: "eje",
		type_label: "eje",
		type_context: true,
		lms: 'canvas'
	};
```
#
** ¿Cómo funciona? **

** `cant`: ** `número` - recibe el número de Ejes o Módulos a renderizar.

** `type`:  ** `string` - recibe la unidad de medida para dividir el curso (Eje, Módulo, Nodo, etc).

** `type_label`:  ** `string` - recibe el mismo valor del `type`.

** `type_context`:  ** `boolean` - Por defecto es verdadero, cambiar a falso si el curso es Diplomado.

** `lms`:  ** `string` - recibe dos valores; canvas y moodle, cada uno cambia especificaciones en el front.

#
#