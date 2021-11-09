/*
  Warnings:

  - You are about to drop the column `presetador_id` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `prestador_id` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_presetador_id_fkey";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "presetador_id",
ADD COLUMN     "prestador_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Posts" ADD FOREIGN KEY ("prestador_id") REFERENCES "Prestador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
