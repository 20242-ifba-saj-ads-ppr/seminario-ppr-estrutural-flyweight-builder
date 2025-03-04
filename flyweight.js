class EntityFactory {
    constructor() {
        this.entites = {};
    }

    createMonster(prefab, name, health, damage) {
        if (!this.entites[prefab]) {
            console.log(`[Log] New Entity Registered: ${prefab}`);
            this.entites[prefab] = new Monster(prefab, name, health, damage);
        }
        console.log(`[Log] Instantiating New Entity: ${prefab}`);
        let newEntity = this.entites[prefab]
        newEntity.name = this.name;
        newEntity.health = this.health;
        newEntity.damage = this.damage;
        return newEntity;
    }

    bulkCreateMonster(prefab, name, health, damage, quantity) {
        for (let i = 0; i < quantity; i++) {
            this.createMonster(prefab, name, health, damage);
        }
    }
}

class Monster {
    constructor(prefab, name, health, damage) {
        this.prefab = prefab; // código singular
        this.name = name;
        this.health = health;
        this.damage = damage;
    }

    details() {
        console.log(`[Log] ${this.prefab} information:\nname: ${this.name}\nhealth: ${this.health}\ndamage: ${this.damage}`);
    }
}

const entityFactory = new EntityFactory();

const spider = entityFactory.bulkCreateMonster("spider", "Spider", 100, 20, 6);
const spider_warrior = entityFactory.createMonster("spider_warrior", "Spider Warrior", 200, 40);
const spider_hider = entityFactory.createMonster("spider_hider", "Cave Spider", 600, 20);