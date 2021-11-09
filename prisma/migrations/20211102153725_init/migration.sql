-- CreateTable
CREATE TABLE "Agendamento" (
    "id" TEXT NOT NULL,
    "from" INTEGER NOT NULL,
    "at" INTEGER NOT NULL,
    "dia" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "avatar" TEXT,
    "token" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "avatar" TEXT,
    "work_init" TEXT NOT NULL,
    "work_and" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "content" VARCHAR NOT NULL,
    "recipient_id" VARCHAR NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "service" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "time" VARCHAR NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_tokens" (
    "id" TEXT NOT NULL,
    "token" UUID NOT NULL,
    "user_id" UUID,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "provider_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bloqueio" (
    "id" TEXT NOT NULL,
    "provider_id" VARCHAR NOT NULL,
    "from" VARCHAR NOT NULL,
    "at" VARCHAR NOT NULL,
    "mes" INTEGER NOT NULL,
    "dia" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservas" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "at" TEXT NOT NULL,
    "dia" INTEGER,
    "mes" INTEGER,
    "ano" INTEGER,
    "week" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "prestador_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promocao" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "prestador_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prestador.email_unique" ON "Prestador"("email");

-- AddForeignKey
ALTER TABLE "Agendamento" ADD FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD FOREIGN KEY ("provider_id") REFERENCES "Prestador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD FOREIGN KEY ("provider_id") REFERENCES "Prestador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
