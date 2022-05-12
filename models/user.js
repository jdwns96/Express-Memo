const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true, // deletaAt 옵션
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 이모티콘 추가인듯
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
  }
};
