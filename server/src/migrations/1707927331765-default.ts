import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1707927331765 implements MigrationInterface {
    name = 'Default1707927331765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" SERIAL NOT NULL, "pokeApiId" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0b503db1369f46c43f8da0a6a0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_pokemon" ("id" SERIAL NOT NULL, "captureDate" TIMESTAMP NOT NULL, "userId" integer, "pokemonId" integer, CONSTRAINT "PK_24ef932d434bed1275ecc545eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_pokemon" ADD CONSTRAINT "FK_d28263f1da4aa0ec6182439ac86" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_pokemon" ADD CONSTRAINT "FK_495099bd5fc7c8eeb9f6a903858" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_pokemon" DROP CONSTRAINT "FK_495099bd5fc7c8eeb9f6a903858"`);
        await queryRunner.query(`ALTER TABLE "user_pokemon" DROP CONSTRAINT "FK_d28263f1da4aa0ec6182439ac86"`);
        await queryRunner.query(`DROP TABLE "user_pokemon"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
