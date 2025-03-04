## Motivação

Imagine um jogo que envolve a criação de múltiplas instâncias de entidades (como inimigos, NPCs, ou objetos reutilizáveis), criar novos objetos repetidamente pode ser ineficiente. Resultando no consumo excessivo de memória: Se cada entidade fosse criada individualmente sem reuso, o sistema alocaria mais memória desnecessariamente.

Sempre que fosse necessário criar um monstro, seria preciso instanciar manualmente e definir seus atributos,dificultando a manutenção.

### Para Solucionar esse problema
A implementação do Factory Pattern com Flyweight resolve esses problemas:

Reutilização de Objetos: O código reutiliza entidades com base no identificador prefab, evitando alocações desnecessárias.
Facilidade de Manutenção: Toda a lógica de criação de entidades fica centralizada na EntityFactory, tornando modificações futuras mais fáceis.
Escalabilidade: Com o método bulkCreateMonster, múltiplas entidades podem ser criadas dinamicamente sem precisar instanciar cada uma manualmente.

@startuml

class EntityFactory {
    - entites: Map<String, Monster>
    + createMonster(prefab: String, name: String, health: int, damage: int): Monster
    + bulkCreateMonster(prefab: String, name: String, health: int, damage: int, quantity: int): void
}

class Monster {
    + prefab: String
    + name: String
    + health: int
    + damage: int
    + details(): void
}

EntityFactory "1" -- "*" Monster : creates
@enduml@startuml

class EntityFactory {
    - entites: Map<String, Monster>
    + createMonster(prefab: String, name: String, health: int, damage: int): Monster
    + bulkCreateMonster(prefab: String, name: String, health: int, damage: int, quantity: int): void
}

class Monster {
    + prefab: String
    + name: String
    + health: int
    + damage: int
    + details(): void
}

EntityFactory "1" -- "*" Monster : creates
@enduml


```js
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



```