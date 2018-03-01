CREATE TABLE [dbo].[UserCategory]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	[UserId] INT NOT NULL,
	[CategoryId] INT NOT NULL,
	[IncludeCategory] BIT DEFAULT(1),
	
	CONSTRAINT FK_User_UC FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]),
	CONSTRAINT FK_Category_UC FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([Id])
)
