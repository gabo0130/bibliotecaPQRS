//Instancia de Sequelize y configuración de base de datos
//Para crear una conexión a la base de datos, se necesita crear una instancia de Sequelize y configurarla correctamente mediante los detalles de la base de datos. Por ejemplo, en app.js:
//Importa Sequelize a tu archivo
const Sequelize = require('sequelize');

const sequelize = new Sequelize('nombre_de_la_base_de_datos', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql' // la base de datos que se va usar
});
//Crea una instancia de Sequelize y configurala con los detalles de tu base de datos


//Definición de los modelos
//Los modelos son clases que representan las tablas en tu base de datos. Para crear un nuevo modelo, puedes usar la función define de Sequelize:
const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
});
//Crea un nuevo modelo de usuario con dos campos: firstName y lastName
//Sincronización de modelos con la base de datos
//Antes de poder utilizar los modelos en la aplicación, es necesario sincronizarlos con la base de datos. Esto se realiza con la función sync de Sequelize:
sequelize.sync();
//Sincroniza los modelos con la base de datos
//Uso de los modelos en la aplicación
//Ahora que se han sincronizado los modelos, se pueden utilizar para interactuar con la base de datos. Por ejemplo, para crear un nuevo registro en la tabla users, se puede hacer lo siguiente:
User.create({ firstName: 'John', lastName: 'Doe' });
//Crea un nuevo registro en la tabla de usuarios con los valores de firstName y lastName especificados.
