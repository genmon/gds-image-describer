# gds-image-describer

This demo uses the GPT-4 Vision API to generate alt text for images. It helps us understand where this can be useful and what the limitations are.

The demo is scoped to the GDS blog. It works only with URLs that start with `https://gds.blog.gov.uk/...`.

## Initial observations

- The model is good at generating alt text-like descriptions...
- ...but you wouldn't put them on a website without checking and potentially editing/rewriting first.

Therefore something like this may fit into a "auto-suggest" type of workflow.

## Development

To run this locally:

- clone the repo
- install dependencies: `npm install`
- [create an OpenAI API key](https://platform.openai.com/api-keys)
- copy the file `.env.example` to `.env` and add your OpenAI API key
- run the app: `npm run dev`
- visit [127.0.0.1:1999](http://127.0.0.1:1999) in your browser

If you make changes, you can deploy with `npm run deploy`. You will be prompted to sign in to PartyKit, and will be given the public URL of your deployed app at the end of the process. (Note it will take a few minutes for the URL to become active after the first deployment.)
