# BECrossDevice

## Error in Type of Object

In case of using type `res:Request`, it will return an error of data type User error -> declare with attributes `res:any`

## Changing in DB

Instead of using MongoAtlas to tracking and changing something in DB,
To change easily , use :
`npx prisma studio`

## GUIDE

1. Install npm
   `yarn`
2. Migrate Schema
   `npx prisma db push`

3. Run project
   `yarn start`
