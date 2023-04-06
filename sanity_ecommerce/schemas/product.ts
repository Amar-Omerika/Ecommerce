/**
 * @description hotspot, Enables the user interface for selecting what areas of an image should always be cropped, 
what areas should never be cropped,
and the center of the area to crop around when resizing,
A slug is a unique string (typically a normalized version of title or other representative string), often used as part of a URL.
If something is still unclear, visit sanity docs and search for keywords
 * @author Amar Omerika
 */

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {name: 'price', title: 'Price', type: 'number'},
    {name: 'details', title: 'Details', type: 'string'},
  ],
}
