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
        return  JSON.stringify(this.toJSON(),null,50);
        // return  JSON.stringify(this.toJSON());
        //null那空位是內容取代  2是縮排的格式 
    }
}

module.exports = Person;