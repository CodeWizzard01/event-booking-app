import { Field, Float, ID, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

@ObjectType()
@Entity("Artist")
export class Artist {
    
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    bio: string;

    @Field()
    @Column({ nullable: true })
    imageUrl?: string;

    @Field(type => [Event])
    @ManyToMany(() => Event, (event) => event.artists)
    events: Event[];
  }
  
  @ObjectType()
  @Entity("Booking")
  export class Booking {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => Date)
    @Column()
    bookingDate: Date;

    @Field(type => Int)
    @Column()
    userId: number;

    @Field(type => Int)
    @Column()
    eventId: number;

    @Field(type => Float)
    @Column()
    price: number;

    @Field(type => [Ticket])
    @OneToMany(() => Ticket, (ticket) => ticket.bookingId)
    tickets: Ticket[];
  }

  @InputType()
  export class BookingInput {
    @Field(type => Int)
    eventId: number;
    @Field(type => [Int])
    seats: number[];
  }
  
  
  @ObjectType()
  @Entity("Event")
  export class Event {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field(type => Date)
    @Column()
    eventDate: Date;

    @Field()
    @Column({ nullable: true })
    category: string;

    @Field()
    @Column({ nullable: true })
    imageUrl?: string;

    @Field(type => Int)
    @Column()
    venueId: number;

    @Field(type => Venue)
    @ManyToOne(() => Venue, (venue) => venue.id)
    @JoinColumn({name: 'venueId'})
    venue?: Relation<Venue>;

    @Field(type => [Artist])
    @ManyToMany(() => Artist, (artist) => artist.events)
    @JoinTable({name: "Event_Artist"})
    artists: Artist[];
  }
  
  @Entity("Review") 
  export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column({ nullable: true })
    comment?: string;

    @Column()
    userId: number;

    @Column()
    eventId: number;
  }
  
  @ObjectType()
  @Entity("Ticket")
  export class Ticket {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => Int)
    @Column()
    seatNo: number;

    @Field(type => Int)
    @Column()
    bookingId: number;

    @Field(type => Booking)
    @ManyToOne(() => Booking, (booking) => booking.id)
    @JoinColumn({name: 'bookingId'})
    booking: Booking;
  }
  
  @ObjectType()
  @Entity("User")
  export class User {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field() 
    @Column()
    name: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column()
    role: string;
  }

  @InputType()
  export class UserInput{
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    password: string;
    @Field({nullable: true})
    role?: string;
  }
  
  @ObjectType()
  @Entity("Venue")
  export class Venue {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    address: string;

    @Field()
    @Column()
    location: string;

    @Field(type => Int)
    @Column()
    capacity: number;

    @Field(type => [Event])
    @OneToMany(() => Event, (event) => event.venueId)
    events: Event[];
  }

  @ObjectType()
  export class Weather {
    @Field(type => Float)
    temp: number;
    @Field(type => Float)
    feels_like: number;
    @Field(type => Float)
    temp_min: number;
    @Field(type => Float)
    temp_max: number;
    @Field(type => Float)
    humidity: number;
    @Field()
    description: string;
  }


  @InputType()
  export class EventInput{
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    eventDate: string;

    @Field()
    category: string;

    @Field({nullable: true})
    imageUrl?: string;

    @Field(type => Int)
    venueId: number;

    @Field(type => [Int])
    artistIds: number[];
  }

  @InputType()
  export class VenueInput{
    @Field()
    name: string;
    @Field()
    address: string;
    @Field()
    location: string;
    @Field()
    capacity: number;
  }

  @InputType()
  export class LoginInput {
    @Field()
    email: string;
    @Field()
    password: string;
  }

  @ObjectType()
  export class LoginToken {
    @Field()
    accessToken: string;
    @Field()
    refreshToken: string;
  }

  export class UserContext {
    name: string;
    id: number;
    role: string;
  }

  export class AppContext {
    userContext?: UserContext;
  }