const Sequelize = require('sequelize');
const sequelize = new Sequelize('bluePERN', 'postgres', process.env.PASS, {
    host: 'localhost',
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