import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'chat',
  title: 'Chat / Guestbook',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Pengirim',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Pesan',
      type: 'text',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'createdAt',
      title: 'Dibuat Pada',
      type: 'datetime',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'message',
    },
  },
})
