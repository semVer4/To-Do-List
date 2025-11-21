"use strict";
const signIn = (user) => {
    return `Hello, ${user.name}`;
};
console.log(signIn({ id: 1, name: "TypeScript" }));
