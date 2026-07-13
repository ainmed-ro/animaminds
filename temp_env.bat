@echo off
set DATABASE_URL=postgresql://user:password@localhost:5432/animaminds
set DIRECT_URL=postgresql://user:password@localhost:5432/animaminds
node_modules\.bin\prisma.cmd validate --schema=prisma/schema.prisma
