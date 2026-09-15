import prisma from "./db.js";

async function main() {
    prisma.user.findUnique({
        where: {
            id:  1
        }
    });
    const user = await prisma.user.create({
        data: {
            name: "deep bhai",
            email: "'hacked@example.com'); DROP TABLE \"User\"; --"
        }
    })
    // const user = await prisma.user.findMany();
    console.log(user);
}

main();