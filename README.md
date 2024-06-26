# Gymbeam Case study

I did put a lot of commentsto the code as explanation of some of the decisions I made.

I have to add [] before each Query parameter because API does not support non-array multiselect values, which breaks the other values like checkbox that are not an array.
This is an API issue and I had to do a workaround, API should accept a non array value like: manufacturer=gymbeam.
Others formats like 'a=b&a=c' or 'a=b,c' do not seem to be working either.
But maybe I just missed something.

What I did not like by visiting https://gymbeam.com/sports-nutrition is that if I select something in the filter, it automatically starts to filter
and the filter component closes, which I find frustrating, because maybe I want to choose multiple filters at once.
Therefore, I added a button for "search".
I realize that options update by filters, its kinda difficult to know how at this moment (I dont have enough insight) to display this property to 
try to minimize incorrect combinations like "BCAA" (main category) and "Sypané čaje". Maybe a good solution would be to have more selective category subpages like:
/proteins, /bcaas, /multivitamins and then have specific filtering.

The filtering is just simple HTML form, no need for any state management. 
NextJS will cache the HTML and JS and the data are fetched and rendered on the Server.
Users are getting SSR page. If I would implement pagination, I would propagate the results from server to client,
and in this case yes, I would very likely use client side fetching (just for pagination) for better user experience.

About the UI, I choose shadcn to give it just a little bit of visual and component functionality and used Tailwind for some simple styling.

I did not do much styling for filtering, there are many filters, my worry would be that it would not fit on some mobile devices.
There are some UI "fixes" that could be done. I would probably choose sidebar filtering, that slides out, like this (can be scrollable):
https://cdn.prod.website-files.com/65d605a3b4417479c154329f/65e81ef31447ffdcbef0e904_See-moreless.gif
This design also could be used on desktop, which imho provide a good user experience and is not mixed with product results.

This code is reusable and could be used for any category page with filtering (if there are no breaking features I am not aware of).

## Getting Started

Create .env.local and set the variable: GYMBEAM_API=https://gymbeam.sk/rest/V1

Install packages bun install (or use other package manager).

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.