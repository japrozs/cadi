import { pickRandom } from "../utils/pickRandom";
import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    //   @OneToMany(() => Post, (post) => post.creator)
    //   posts: Post[];

    @Field()
    @Column({ unique: true })
    username!: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Field()
    @Column({ default: "https://avatars.githubusercontent.com/u/57936?v=4" })
    imgUrl!: string;

    @Field()
    @Column({ default: pickRandom() })
    description!: string;

    @Column()
    password!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
