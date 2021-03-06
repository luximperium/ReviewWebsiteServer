const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to bluePERN postgres database');
    },
    function(err){
        console.log('Connection to database failed!')
    }
);

module.exports = sequelize;