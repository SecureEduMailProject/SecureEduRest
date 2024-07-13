import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {EntityManager} from "@mikro-orm/core";
import {Logger} from "../../utils/Logger";
import {Random} from "../../utils/Random";

@Entity({tableName: "users"})
export class Users {

    @PrimaryKey({ type: 'number', columnType: 'int', unsigned: true, autoincrement: true })
    id!: number;

    @Property({type: "text", unique: true})
    token: string = Random.generateId();

    @Property({type: "text", unique: true})
    username!: string;

    @Property({type: "text", unique: true})
    email!: string;

    @Property({type: "text"})
    password!: string;

    @Property({type: "text", unique: true})
    SecureUIDMail!: string;

    @Property({type: "boolean", nullable: true})
    administrator!: boolean;

    @Property({type: "date"})
    createdAt!: Date;

///////////////////////////////////////////////////////////////////////

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getAdministrator() {
        return this.administrator;
    }

    getPassword() {
        return this.password;
    }


    getToken() {
        return this.token;
    }

    getSecureUIDMail() {
        return this.SecureUIDMail;
    }

///////////////////////////////////////////////////////////////////////

    setUsername(username: string) {
        this.username = username;
        return this;
    }

    setEmail(email: string) {
        this.email = email;
        return this;
    }

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
        return this;
    }

    setAdministrator(administrator: boolean) {
        this.administrator = administrator;
        return this;
    }

    setPassword(password: string) {
        this.password = password;
        return this;
    }

    setToken(token: string) {
        this.token = token;
        return this;
    }

    setSecureUIDMail(SecureUIDMail: string) {
        this.SecureUIDMail = SecureUIDMail;
        return this;
    }

///////////////////////////////////////////////////////////////////////

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