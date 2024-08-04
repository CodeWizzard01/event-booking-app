import { AppContext, Booking, BookingInput, Ticket } from '../types/types.js';
import { AppDataSource } from "../connection/datasource.js";
import { Repository } from "typeorm";
import { Arg, Authorized, Ctx, Field, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

@Resolver(of => Booking)
export class BookingResolver {

    private bookingRepository: Repository<Booking> = AppDataSource.getRepository(Booking);
    private ticketRepository: Repository<Ticket> = AppDataSource.getRepository(Ticket);

    @Query(returns => [Booking])
    @Authorized()
    bookings(@Arg("eventId") eventId:number,@Ctx() ctx: AppContext): Promise<Booking[]> {
        const isUserAdmin = ctx.userContext?.role === 'ROLE_ADMIN';
        if(isUserAdmin){
            return this.bookingRepository.find({where: {eventId}});
        }
        else{
            return this.bookingRepository.find({where: {eventId, userId: ctx.userContext?.id}});
        }
    }

    @FieldResolver(returns => [Ticket])
    tickets(@Root() booking: Booking): Promise<Ticket[]> {
        return this.ticketRepository.find({where: {bookingId: booking.id}});
    }

    @Mutation(returns => Booking)
    @Authorized()
    async createBooking(@Arg("bookingInput") bookingInput: BookingInput, @Ctx() ctx: AppContext): Promise<Booking> {
        const booking = new Booking();
        booking.eventId = bookingInput.eventId;
        booking.userId = ctx.userContext?.id;
        booking.bookingDate = new Date();
        booking.price = 50*bookingInput.seats.length;
        return await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            const savedBooking = await transactionalEntityManager.save(booking);
            const tickets: Ticket[] = bookingInput.seats.map(seat => {
                const ticket = new Ticket();
                ticket.bookingId = savedBooking.id;
                ticket.seatNo = seat;
                return ticket;
            });
            await transactionalEntityManager.save(tickets);
            return savedBooking;
        });
    }

}