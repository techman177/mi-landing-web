import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '20vh16ty', // <--- PON TU ID AQUÍ
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2024-05-29', 
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);