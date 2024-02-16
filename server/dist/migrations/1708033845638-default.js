"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1708033845638 = void 0;
class Default1708033845638 {
    constructor() {
        this.name = 'Default1708033845638';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_pokemon" ("name" SERIAL NOT NULL, "image" character varying NOT NULL, "pokemonType" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "captureDate" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_ab8235fb3bbceb98d283b9fce47" PRIMARY KEY ("name"))`);
        await queryRunner.query(`ALTER TABLE "user_pokemon" ADD CONSTRAINT "FK_d28263f1da4aa0ec6182439ac86" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_pokemon" DROP CONSTRAINT "FK_d28263f1da4aa0ec6182439ac86"`);
        await queryRunner.query(`DROP TABLE "user_pokemon"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.Default1708033845638 = Default1708033845638;
