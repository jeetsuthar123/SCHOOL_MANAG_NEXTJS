/*
  Warnings:

  - You are about to drop the column `endDate` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Made the column `studentId` on table `Attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lessonId` on table `Attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gradeId` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subjectId` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classId` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacherId` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Parent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `Result` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `birthday` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `parentId` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gradeId` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `birthday` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_classId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "endDate",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "studentId" SET NOT NULL,
ALTER COLUMN "lessonId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "supervisorId" DROP NOT NULL,
ALTER COLUMN "gradeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "subjectId" SET NOT NULL,
ALTER COLUMN "classId" SET NOT NULL,
ALTER COLUMN "teacherId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Parent" ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "Result" ALTER COLUMN "studentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "parentId" SET NOT NULL,
ALTER COLUMN "gradeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
