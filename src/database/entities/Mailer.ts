import {Entity, EntityManager, PrimaryKey, Property} from "@mikro-orm/core";
import {Random} from "../../utils/Random";
import { Logger } from "../../utils/Logger";

@Entity({tableName: "mailer"})
export class Mailer {

    @PrimaryKey({ type: 'number', columnType: 'int', unsigned: true, autoincrement: true })
    id!: number;

    @Property({ type: 'string'})
    sender!: string

    @Property({ type: 'string'})
    recipient!: string

    @Property({ type: 'string'})
    title!: string

    @Property({type: 'string'})
    description!: string

    @Property({ type: 'text', })
    content!: string

    @Property({ type: 'string'})
    time!: Date

    @Property({ type: 'boolean'})
    important!: boolean

    @Property({ type: 'string'})
    token: string = Random.generateId();

    //////////////////////////////////////////////////

    getSender(): string {
        return this.sender;
    }

    getRecipient(): string {
        return this.recipient;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getContent(): string {
        return this.content;
    }

    getTime(): Date {
        return this.time;
    }

    isImportant(): boolean {
        return this.important;
    }

    getToken(): string {
        return this.token;
    }

    //////////////////////////////////////////////////////

    setSender(sender: string): void {
        this.sender = sender;
    }

    setRecipient(recipient: string): void {
        this.recipient = recipient;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setContent(content: string): void {
        this.content = content;
    }

    setTime(time: Date): void {
        this.time = time;
    }

    setImportant(important: boolean): void {
        this.important = important;
    }

    ///////////////////////////////////////////////////////

    async saveMail(em: EntityManager) {
        try {
            await em.persistAndFlush(this);
            return this;
        } catch (e) {
            Logger.error(e);
            return null;
        }
    }

    async deleteMail(em: EntityManager) {
        try {
            await em.removeAndFlush(this);
            return this;
        } catch (e) {
            Logger.error(e);
            return null;
        }
    }

}