module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Super admin',
        email: 'superadmin@tma.com',
        role:"Admin",
        password: '$2b$10$Z6hllyrHXTyenYzejaYxBOj9NqKMZ9DNl9pbxbtbeoyJRXjgB19DK',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
      name: 'Staff 1',
      email: 'staff1@tma.com',
      role:"Staff",
      password: '$2b$10$Z6hllyrHXTyenYzejaYxBOj9NqKMZ9DNl9pbxbtbeoyJRXjgB19DK',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Staff 2',
      email: 'staff2@tma.com',
      role:"Staff",
      password: '$2b$10$Z6hllyrHXTyenYzejaYxBOj9NqKMZ9DNl9pbxbtbeoyJRXjgB19DK',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};