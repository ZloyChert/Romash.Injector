CREATE TABLE [dbo].[Categories]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	[CreatedUserId] INT NOT NULL,
	[Name] VARCHAR(30) NOT NULL,
	[Description] VARCHAR(30) NULL, 
	[ImgSrc] VARCHAR(100) NULL, 

    CONSTRAINT FK_CategoriesUsers FOREIGN KEY ([CreatedUserId]) REFERENCES [dbo].[Users] ([Id])
)
