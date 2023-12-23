# Recipes site

The Cook&Eat site was built to create recipes and share them with people (soon!). The project was built on Next.js using Typescript and Tailwindcss.

## Getting Started

1. Rename the ```.env.example``` file to ```.env``` file.

2. Fill in the credentials in the blank places in the ```.env``` file.

3. Install the dependencies:
```bash
npm install
```

4. Generate the Prisma database
```bash
npx prisma generate
npx prisma db push
```

5. Run the project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.