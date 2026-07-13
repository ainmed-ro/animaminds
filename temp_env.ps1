$env:DATABASE_URL='postgresql://user:password@localhost:5432/animaminds'
$env:DIRECT_URL='postgresql://user:password@localhost:5432/animaminds'
& ".\node_modules\.bin\prisma.cmd" validate --schema=prisma/schema.prisma
