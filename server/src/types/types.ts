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
  
  @Entity("Booking")
  export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bookingDate: Date;

    @Column()
    userId: number;

    @Column()
    eventId: number;

    @Column()
    price: number;

    @OneToMany(() => Ticket, (ticket) => ticket.bookingId)
    tickets: Ticket[];
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
  
  @Entity("Ticket")
  export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    seatNo: number;

    @Column()
    bookingId: number;

    @ManyToOne(() => Booking, (booking) => booking.id)
    @JoinColumn({name: 'bookingId'})
    booking: Booking;
  }
  
  @Entity("User")
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
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