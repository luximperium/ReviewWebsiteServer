module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artistName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        author: {
            type: DataTypes.STRING,
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Review;
}