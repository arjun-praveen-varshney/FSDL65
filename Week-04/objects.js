let person = {
    name: "Arjun",
    age: 20,
    greet: () => {
        console.log("Hello, my name is " + this.name);
    }
};

console.log(person.name);
person.greet();
