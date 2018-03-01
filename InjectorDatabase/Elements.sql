CREATE TABLE [dbo].[Elements]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	[ElementGuid] VARCHAR(40) NOT NULL,
	[CategoryId] INT NOT NULL,
	[HtmlElement] VARCHAR(MAX) NOT NULL,
	[Name] VARCHAR(30) NOT NULL,

    CONSTRAINT FK_elementsCategories FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([Id])
)
