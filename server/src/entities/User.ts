import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPokemon } from "./UserPokemon";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @OneToMany(() => UserPokemon, (UserPokemon) => UserPokemon.user)
  userPokemons: UserPokemon[];
}
