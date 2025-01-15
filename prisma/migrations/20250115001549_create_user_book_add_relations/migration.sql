-- AlterTable
ALTER TABLE "User" ADD COLUMN     "present_book_id" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_present_book_id_fkey" FOREIGN KEY ("present_book_id") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
