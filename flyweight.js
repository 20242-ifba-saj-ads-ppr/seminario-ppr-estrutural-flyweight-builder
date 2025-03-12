class EntityFactory {
    constructor() {
        this.entities = {};
    }

    getMonsterState(prefab) {
        if (!this.entities[prefab]) {
            console.log(`[Log] New Shared State Registered: ${prefab}`);
            this.entities[prefab] = MonsterSharedState.create(prefab);
        }
        return this.entities[prefab];
    }

    createMonster(prefab, health) {
        const sharedState = this.getMonsterState(prefab);
        console.log(`[Log] Instantiating New Entity: ${prefab}`);
        return new Monster(sharedState, health);
    }

    bulkCreateMonster(prefab, health, quantity) {
        const monsters = [];
        for (let i = 0; i < quantity; i++) {
            monsters.push(this.createMonster(prefab, health));
        }
        return monsters;
    }
}

class MonsterSharedState {
    constructor(prefab, name, maxhealth, damage) {
        this.prefab = prefab;
        this.name = name;
        this.maxhealth = maxhealth;
        this.damage = damage;
    }

    static create(prefab) {
        const monsterTypes = {
            spider: new MonsterSharedState("spider", "Spider", 100, 20),
            spider_warrior: new MonsterSharedState("spider_warrior", "Spider Warrior", 200, 40),
            spider_hider: new MonsterSharedState("spider_hider", "Cave Spider", 600, 20)
        };
        return monsterTypes[prefab];
    }
}

class Monster {
    constructor(sharedState, health) {
        this.sharedState = sharedState;
        this.health = health;
    }

    details() {
        console.log(`[Log] ${this.sharedState.prefab} information:\nname: ${this.sharedState.name}\nhealth: ${this.health}\ndamage: ${this.sharedState.damage}`);
    }
}

const entityFactory = new EntityFactory();

const spiders = entityFactory.bulkCreateMonster("spider", 80, 6);
const spiderWarrior = entityFactory.createMonster("spider_warrior", 180);
const spiderHider = entityFactory.createMonster("spider_hider", 500);

spiders.forEach(spider => spider.details());
spiderWarrior.details();
spiderHider.details();