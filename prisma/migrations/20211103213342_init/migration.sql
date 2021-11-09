/*
  Warnings:

  - You are about to drop the column `prestador_id` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `presetador_id` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "prestador_id",
ADD COLUMN     "presetador_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Posts" ADD FOREIGN KEY ("presetador_id") REFERENCES "Prestador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocao" ADD FOREIGN KEY ("prestador_id") REFERENCES "Prestador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
