class Person {
    constructor(name ='noname',age = 20){
        this.name = name;
        this.age = age;
    }
    toJSON(){
        return{
            name: this.name,
            age: this.age,
        }
    }
    toString(){
        return  JSON.stringify(this.toJSON(),null,4);
        // return  JSON.stringify(this.toJSON());
        //null那空位是內容取代   
    }
}

module.exports = Person;