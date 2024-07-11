import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {EntityManager} from "@mikro-orm/core";
import {Logger} from "../../utils/Logger";

@Entity({tableName: "users"})
export class Users {

    @PrimaryKey()
    id!: number;

    @Property({type: "text", unique: true})
    username!: string;

    @Property({type: "text", unique: true})
    email!: string;

    @Property({type: "text"})
    password!: string;

    @Property({type: "boolean", nullable: true})
    administrator!: boolean;

    async saveUser(em: EntityManager) {
        try {
            await em.persistAndFlush(this);
            return this;
        } catch (e) {
            Logger.error(e);
            return null;
        }
    }

    async deleteUser(em: EntityManager) {
        try {
            await em.removeAndFlush(this);
            return this;
        } catch (e) {
            Logger.error(e);
            return null;
        }
    }
}