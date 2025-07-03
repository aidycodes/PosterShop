import Product, { ProductProps } from "./product";
import { client } from "@/lib/client";
import { Metadata, ResolvingMetadata } from "next";
import { z } from "zod";
import UnavailableProduct from "./UnavailableProduct";
type tParams = Promise<{name: string}>

type Props = {
    params: tParams
}

export const optionsSchema = z.object({
    Stock: z.object({
        Large: z.number(),
        Small: z.number(),
        Medium: z.number(),
        XLarge: z.number(),
    }),
    sizes: z.object({
        "Large (A1 - 23.4\" × 33\" / 594 × 827 mm)": z.number(),
        "Small (A3 - 11.7\" × 16.5\" / 297 × 420 mm)": z.number(),
        "XLarge (A0 - 33\" × 46.8\" / 827 × 1169 mm)": z.number(),
        "Medium (A2 - 16.5\" × 23.4\" / 420 × 594 mm)": z.number(),
    }),
    stripeIds: z.object({
        Large: z.string(),
        Small: z.string(),
        Medium: z.string(),
        XLarge: z.string(),
    }),
});

export type OptionsProps = z.infer<typeof optionsSchema>;


export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
  
    const { name } = await params;
    const decodedString = decodeURIComponent(name as string)
   
    return {
      title: `Poster Hub - ${decodedString}`,
      description: `Poster Hub is a platform for buying posters`,
      icons: [{ rel: "icon", url: "/favicon.webp" }],
    }
  }

const Page = async (params: { params: tParams }) => {
    const { name } = await params.params;
    const decodedString = decodeURIComponent(name)
    const product = await client.products.productByName.$get({name: decodedString})
    const productData: ProductProps[] = await product.json();
    if (!productData[0]) return <div>Product not found</div>;

    const options = optionsSchema.safeParse(productData[0].options)

    return (
        <div>
        {options.success ?
            <Product {...productData[0]} />
            : <UnavailableProduct />
        }
        </div>
    );
};

export default Page