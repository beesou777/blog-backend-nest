-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "creatdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "blogImages" TEXT NOT NULL,
    "upvote" INTEGER NOT NULL,
    "increment" BOOLEAN NOT NULL,
    "decrement" BOOLEAN NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
