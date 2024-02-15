import { UserPokemon } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

export function LastPokemons({ pokemons }: { pokemons: UserPokemon[] }) {
  const numCards = 10; 

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Ultimos Pokemons capturados</h1>
        <Link href="/pokemons">Ver todos</Link>
      </div>
      {pokemons && pokemons.length > 0 ? (
        <Carousel
          opts={{
            slidesToScroll: 1,
            align: "start",
            loop: true,
          }}
          className="w-full overflow-hidden relative max-w-[100%]"
        >
          <CarouselContent>
            {pokemons.length > 0 ? (
              [...Array(numCards)].map((_, index) => (
                <CarouselItem className="basis-1/10 h-[280px]" key={index}>
                  <div className="h-full">
                    {index < pokemons.length ? (
                      <Card className="card-pokemon h-full overflow-hidden">
                        <CardContent className="flex flex-col gap-3 aspect-square overflow-hidden items-center h-full justify-center p-4 bg-black bg-opacity-45">
                          <Image
                            src={pokemons[index].image || "/locked-pokemon.png"}
                            width={180}
                            height={180}
                            alt="Pokemon image"
                          />
                          <span className="text-3xl text-center font-semibold text-white">
                            {pokemons[index].name || "????"}
                          </span>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="card-pokemon overflow-hidden">
                        <CardContent className="flex flex-col gap-3 aspect-square overflow-hidden items-center justify-center p-4 bg-black bg-opacity-45">
                          <span className="text-xl items-center text-center font-semibold text-white">
                            Nenhum pokemon capturado
                          </span>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CarouselItem>
              ))
            ) : (
              <span>Nenhum pokemon capturado</span>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <span>Nenhum pokemon capturado</span>
      )}
    </div>
  );
}
