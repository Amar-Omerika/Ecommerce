import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
/**
 * @description Here we connect to sanity
 * @author Amar Omerika
 */

export const client = sanityClient({
	projectId: "77imq2l1",
	dataset: "production",
	apiVersion: "2023-06-04",
	useCdn: true,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
