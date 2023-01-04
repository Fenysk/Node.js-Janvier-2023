const { prisma } = require("./prisma.js");

exports.findUserByEmail = function findUserByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
}

exports.findUserById = function findUserById(id) {
    if (!id) {
        return null;
    }
    
    return prisma.user.findUnique({
        where: {
            id
        }
    });
}