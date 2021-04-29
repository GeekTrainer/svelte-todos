-- CreateTable
CREATE TABLE [dbo].[Task] (
    [id] INT NOT NULL IDENTITY(1,1),
    [text] NVARCHAR(255) NOT NULL,
    [completed] BIT NOT NULL CONSTRAINT [DF__Task__completed] DEFAULT 0,
    CONSTRAINT [PK__Task__id] PRIMARY KEY ([id]),
    CONSTRAINT [Task_text_unique] UNIQUE ([text])
);
