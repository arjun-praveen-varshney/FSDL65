class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
    }
}

let person1 = new Person("Arjun", 20);
person1.greet();
