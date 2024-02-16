import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class UserPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  pokemonType: string;

  @Column({ type: "float" })
  weight: number;

  @Column({ type: "float" })
  height: number;

  @Column()
  captureDate: Date;

  @ManyToOne(() => User, (user) => user.userPokemons)
  user: User;
}
