-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "starred_url" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repos" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "language" TEXT,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "owner_name" TEXT NOT NULL,
    "owner_url" TEXT NOT NULL,
    "tags" TEXT[],
    "user_id" TEXT NOT NULL,

    CONSTRAINT "repos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "repos" ADD CONSTRAINT "repos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
