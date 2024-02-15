// src/entity/UserPokemon.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";
import { Pokemon } from "./Pokemon";

@Entity()
export class UserPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userPokemons)
  user: User;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.userPokemons)
  pokemon: Pokemon;

  @Column()
  captureDate: Date;
}
