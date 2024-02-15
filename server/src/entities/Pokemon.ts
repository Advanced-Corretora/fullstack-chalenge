// src/entity/Pokemon.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserPokemon } from "./UserPokemon";

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokeApiId: number;

  @Column()
  name: string;

  @OneToMany(() => UserPokemon, (userPokemon) => userPokemon.pokemon)
  userPokemons: UserPokemon[];
}
