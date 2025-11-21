type User = {
    id: number;
    name: string;
};

const signIn = (user: User) => {
    return `Hello, ${user.name}`
};

console.log(signIn({ id: 1, name: "TypeScript" }));