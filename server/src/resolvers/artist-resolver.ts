import { Repository } from "typeorm";
import { Artist } from "../types/types.js";
import { Query, Resolver } from "type-graphql";
import { AppDataSource } from "../connection/datasource.js";

@Resolver((of) => Artist)
export class ArtistResolver {
  private artistRepository: Repository<Artist> =
      AppDataSource.getRepository(Artist);
    
    @Query(() => [Artist])
    artists(): Promise<Artist[]> {
        return this.artistRepository.find();
    }
    
    
}