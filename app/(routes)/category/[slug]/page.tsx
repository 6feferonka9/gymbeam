// Ideally, there would be one layout for each page for simplicity and re-usability
// This can be modified for each category separately, if needed for different layouts
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import { CATEGORY_ID_MAP } from "@/data/categoryToIdMap";
import { ApiCategoryResponse } from "@/types/apiResponses";
import { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import qs from 'qs';
import { apiRequestHandler } from "@/functions/apiRequestHandler";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

// I am importing this component dynamically for 2 reasons.
// 1. it throws a SSR warning in the console
// 2. It makes sense to import it dynamically and only when user request it because:
// it handles significant amount of data and its hidden, so there is no needto download this chunk at first load
// The chunksaves about 40ms od loading time on DEV. Not huge, but this is a very tiny app, in a big one those accumulate
const CategoryFiltering = dynamic(() => import("./filtering"), { ssr: false, loading: () => <p>Use some filter skeleton here</p> });

// Would set some metadata here
export const metadata: Metadata = {};

async function loadCategoryData(slug: string | undefined, searchParams: Record<string, string | string[]>) {
  // No category specified, take user to home
  if (!slug) {
    redirect('/');
  }

  if (slug in CATEGORY_ID_MAP) {
    // I have to update the values to be an array so its digested by an API
    const formatedSearchParamsObject = Object.entries(searchParams).reduce((prev, cur) => {
      const value = cur[1];

      if (value === '') return prev;

      return {
        ...prev,
        [cur[0]]: Array.isArray(value) ? value : [value]
      }
    }, {});

    //if the object contains key, we can assume it exists, but additional checks can be done
    const slugCasted = slug as keyof typeof CATEGORY_ID_MAP;
    const categoryId = CATEGORY_ID_MAP[slugCasted].toString();
    const stringifiedSearchParams: string = qs.stringify(formatedSearchParamsObject, { arrayFormat: 'brackets', encodeValuesOnly: true, allowEmptyArrays: false, skipNulls: true });

    const apiResponse = await apiRequestHandler<ApiCategoryResponse>(`/gb/catalog/products?category_ids[]=${categoryId}&${stringifiedSearchParams}`);

    return apiResponse;
  }

  // Throw 404 if the category does not exist
  return notFound();
}

export default async function CategoryPage({ params, searchParams }: { params: { slug: string | undefined }, searchParams: Record<string, string | string[]> }) {
  const categoryData = await loadCategoryData(params.slug, searchParams);

  if (categoryData === null) {
    return (
      <main>Failed to load data 😔</main>
    )
  }

  return (
    <main className="flex flex-col items-center gap-2">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Filtering</Button>
        </DrawerTrigger>
        <DrawerContent>
          <CategoryFiltering categoryData={categoryData.filters} searchParams={searchParams} />
        </DrawerContent>
      </Drawer>

      <div className="w-full flex flex-wrap justify-center gap-4">
        {categoryData.items.map((item, index) => (
          <Card key={item.id}>
            <CardContent className="w-[250px] h-[260px] flex flex-col items-center pb-0">
              <div className="h-[200px]">
                {/* 
                  The priority here makes first few images a priority because they are first visible content, rest is lazy loaded
                  This makes sense mostly on mobile devices, where most of the images do not need to be loaded right away
                  Images also have placeholder which helps on slow connections to create some skeleton
                */}
                <Image
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoKAAoAAgA0JaQAD4eQNeXa+AAA/v1QTSNmm4O3+Pa+/NJwPID3GUeXE4B+Ws5N3GWDG6r3GAoetQuRpObguz7M/QAAAA=="
                  className="h-[200px] object-contain" priority={(index < 4) ? true : false} width="200" height="200" src={item.thumbnail} alt={item.name}>
                </Image>
              </div>
              <span>{item.name}</span>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Rating rating={item.rating_summary} totalReviews={item.reviews_count} />
              <div className="flex flex-row gap-2 items-center">
                <Button size="sm">Buy</Button>
                <span className="text-red-400"><b>{item.formatted_price}</b></span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}