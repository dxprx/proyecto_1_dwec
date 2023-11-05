// Almacenamiento (localstorage, sessiónstorage o cookies)
class Cookie {
    static set(cookieName, newValue, expirationDays) {
        const currentCookieValue = this.get(cookieName) || [];


        currentCookieValue.push(newValue);
        // Gestión (propiedades y métodos) de los siguientes objetos predefinidos: Objeto windows, Objeto String, Objeto Math, Objeto Date, Objeto Array, Objeto RegExp,
        const d = new Date();
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();

        // Tipo de datos (conversión), Operadores, Estructuras de control (condicionales y bucles)
        document.cookie = cookieName + "=" + JSON.stringify(currentCookieValue) + "; " + expires;
    }

    static get(cookieName) {
        const cookies = {};
        document.cookie.split(';').forEach(function (el) {
            const [key, value] = el.trim().split('=');
            cookies[key] = value;
        });
        const cookieValue = cookies[cookieName];
        if (cookieValue) {
            try {
                // Tipo de datos (conversión), Operadores, Estructuras de control (condicionales y bucles)
                return JSON.parse(cookieValue);
            } catch (error) {
                console.error("Error al analizar la cookie", error);
                return null;
            }
        }
        return null;
    }

    static delete(cookieName) {
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    }

    static getAll() {
        const cookies = {};
        document.cookie.split(';').forEach(function (el) {
            const [key, value] = el.trim().split('=');
            cookies[key] = value;
        });
        for (const key in cookies) {
            if (cookies.hasOwnProperty(key)) {
                const cookieValue = cookies[key];
                try {
                    cookies[key] = JSON.parse(cookieValue);
                } catch (error) {
                    console.error("Error al analizar la cookie", error);
                    cookies[key] = null;
                }
            }
        }
        return cookies;
    }

    static deleteCookieValueByID(cookieName, id) {
        const currentValues = this.get(cookieName) || [];

        const updatedValues = currentValues.filter(value => value.id !== id);
        this.delete(cookieName);
        updatedValues.forEach(value => {
            this.set(cookieName, value, 365);

        })

    }


}

// Creación de objetos utilizando el constructor y/o utilizando la definición de clases soportada 
// a partir de ecmascript 6. Debe implementarse herencia en los 2 casos
class Elemento {
    constructor(id) {
        this.id = id;
    }
}

class Tarea extends Elemento{
    constructor(descripcion, completada) {
        super(crypto.randomUUID());
        this.descripcion = descripcion;
        this.completada = completada;
    }


}

